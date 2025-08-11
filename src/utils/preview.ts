import { DEFAULT_LOCALE, PREVIEW_URL } from "@/constants";
import { PayloadRequest } from "payload";

type Props = {
  slug: string;
  req: PayloadRequest;
};

export const getPreviewPath = async ({ slug, req }: Props) => {
  const locale = req?.locale || DEFAULT_LOCALE;
  const path =
    locale === DEFAULT_LOCALE
      ? `/${slug === "home" ? "" : slug}`
      : `/${locale}/${slug === "home" ? "" : slug}`;

  const encodedParams = new URLSearchParams({
    slug,
    path,
    previewSecret: process.env.PREVIEW_SECRET || "",
  });
  const url = `${PREVIEW_URL}?${encodedParams.toString()}`;

  return url;
};
