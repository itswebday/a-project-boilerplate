import { revalidateRedirects } from "@/hooks";
import { Page } from "@/payload-types";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { Plugin } from "payload";

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  // TODO: Replace with actual metadata
  return doc?.title ? `${doc.title}` : "Website";
};

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";

  return doc?.slug ? `${serverUrl}/${doc.slug}` : serverUrl;
};

export const plugins: Plugin[] = [
  vercelBlobStorage({
    collections: {
      media: true,
    },
    token: process.env.BLOB_READ_WRITE_TOKEN || "",
  }),
  redirectsPlugin({
    collections: ["pages"],
    overrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ("name" in field && field.name === "from") {
            return { ...field };
          }

          return field;
        });
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  payloadCloudPlugin(),
];
