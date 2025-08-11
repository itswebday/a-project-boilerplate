import type { Media, Page, Config } from "@/payload-types";
import { mergeOpenGraph } from "@/utils/server";
import type { Metadata } from "next";

const getImageURL = (image?: Media | Config["db"]["defaultIDType"] | null) => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";

  if (image && typeof image === "object" && "url" in image) {
    const openGraphUrl = image.sizes?.openGraph?.url;

    return openGraphUrl ? serverUrl + openGraphUrl : serverUrl + image.url;
  } else {
    return serverUrl + "/website.webp";
  }
};

export const getMetadata = async (args: {
  page: Partial<Page> | null;
}): Promise<Metadata> => {
  const { page } = args;

  // TODO: Replace with actual metadata
  const ogImage = getImageURL(page?.meta?.image);
  const title = page?.meta?.title
    ? page?.meta?.title + " | Website"
    : "Website";

  return {
    title,
    description: page?.meta?.description,
    openGraph: mergeOpenGraph({
      description: page?.meta?.description || "",
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(page?.slug) ? page?.slug.join("/") : "/",
    }),
  };
};
