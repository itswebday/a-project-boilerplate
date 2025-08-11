import configPromise from "@payload-config";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

export const getRedirects = async (depth = 1) => {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "redirects",
    depth: depth,
    limit: 0,
    pagination: false,
  });

  return docs;
};

export const getCachedRedirects = () => {
  return unstable_cache(async () => getRedirects(), ["redirects"], {
    tags: ["redirects"],
  });
};
