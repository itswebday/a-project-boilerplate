import { LocaleOption } from "@/types";
import { showError, showSuccess } from "@/utils";

export const request = async <ResultData>(
  method: "GET" | "POST",
  url: string,
  locale: LocaleOption,
  config: {
    headers?: Record<string, string>;
    body?: object | FormData;
    bodyType?: "json" | "formData";
    searchParams?: Record<string, string | number | boolean>;
    defaultErrorMessage: string;
    successToast?: string;
    hideErrorToasts?: boolean;
    setIsLoading?: (isLoading: boolean) => void;
    setErrors?: (errors: Error[]) => void;
    setResult?: (result: ResultData | null) => void;
    setData?: (data: ResultData | null) => void;
    callback?: () => void;
  },
  debug = true,
) => {
  config.setIsLoading?.(true);
  config.setErrors?.([]);

  try {
    const urlParams = new URLSearchParams();

    urlParams.append("locale", locale);

    if (config.searchParams) {
      Object.entries(config.searchParams).forEach(([key, value]) => {
        urlParams.append(key, String(value));
      });
    }

    const fullUrl = `${url}?${urlParams.toString()}`;
    const requestOptions: RequestInit = {
      method,
      credentials: method === "POST" ? "include" : "omit",
    };

    if (method === "POST") {
      if (config.body) {
        if (config.bodyType === "formData" || config.body instanceof FormData) {
          requestOptions.body = config.body as FormData;
        } else {
          requestOptions.headers = config.headers ?? {
            "Content-Type": "application/json",
          };
          requestOptions.body = JSON.stringify(config.body);
        }
      }
    }

    if (debug) {
      console.log(`\n\n${method} request:`, fullUrl);
    }

    const response = await fetch(fullUrl, requestOptions);

    if (debug) {
      console.log("Response:", response);
    }

    if (!response.ok) {
      try {
        const errorResult = await response.json();
        if (errorResult.data?.errors) {
          throw errorResult.data.errors;
        } else {
          throw [{ message: config.defaultErrorMessage }];
        }
      } catch {
        throw [{ message: config.defaultErrorMessage }];
      }
    }

    const result = await response.json();

    if (debug) {
      console.log("Result:", result, "\n\n\n");
    }

    if (result.status >= 400) {
      config.setData?.(null);
      throw (
        result.data?.errors ?? [
          { message: config.defaultErrorMessage, path: "general" },
        ]
      );
    }

    config.setResult?.(result);
    config.setData?.(result.data);

    if (config.successToast) {
      showSuccess(config.successToast);
    }

    config.callback?.();
  } catch (err) {
    const errors: Error[] = Array.isArray(err)
      ? err
      : err instanceof Error
        ? [err]
        : [new Error(config.defaultErrorMessage)];

    config.setErrors?.(errors);

    if (!config.hideErrorToasts) {
      for (const error of errors) {
        showError(error.message);
      }
    }
  } finally {
    config.setIsLoading?.(false);
  }
};
