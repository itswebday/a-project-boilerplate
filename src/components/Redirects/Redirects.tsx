import { DEFAULT_LOCALE } from "@/constants";
import { getCachedPage, getCachedRedirects } from "@/utils/server";
import { getLocale } from "next-intl/server";
import { notFound, redirect } from "next/navigation";

type RedirectsProps = {
  url: string;
};

const Redirects: React.FC<RedirectsProps> = async ({ url }) => {
  const locale = (await getLocale()) || DEFAULT_LOCALE;
  const redirects = await getCachedRedirects()();
  const redirectItem = redirects.find((redirect) => redirect.from === url);

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url);
    }

    let redirectUrl: string;

    if (typeof redirectItem.to?.reference?.value === "string") {
      const id = redirectItem.to?.reference?.value;
      const page = await getCachedPage(id)();
      const baseUrl =
        redirectItem.to?.reference?.relationTo !== "pages"
          ? `/${redirectItem.to?.reference?.relationTo}`
          : "";
      const pageSlug = page?.slug || "";

      redirectUrl =
        locale === DEFAULT_LOCALE
          ? `${baseUrl}/${pageSlug}`
          : `/${locale}${baseUrl}/${pageSlug}`;
    } else {
      const baseUrl =
        redirectItem.to?.reference?.relationTo !== "pages"
          ? `/${redirectItem.to?.reference?.relationTo}`
          : "";
      const pageSlug =
        typeof redirectItem.to?.reference?.value === "object"
          ? redirectItem.to?.reference?.value?.slug
          : "";

      redirectUrl =
        locale === DEFAULT_LOCALE
          ? `${baseUrl}/${pageSlug}`
          : `/${locale}${baseUrl}/${pageSlug}`;
    }

    if (redirectUrl) {
      redirect(redirectUrl);
    }
  }

  notFound();
};

export default Redirects;
