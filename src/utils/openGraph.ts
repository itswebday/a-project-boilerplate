import type { Metadata } from "next";

const defaultOpenGraph: Metadata["openGraph"] = {
  // TODO: Replace with actual metadata
  type: "website",
  siteName: "Website",
  title: "Website",
  description: "Website",
  images: [{ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/website.webp` }],
};

export const mergeOpenGraph = (
  openGraph?: Metadata["openGraph"],
): Metadata["openGraph"] => {
  return {
    ...defaultOpenGraph,
    ...openGraph,
    images: openGraph?.images ? openGraph.images : defaultOpenGraph.images,
  };
};
