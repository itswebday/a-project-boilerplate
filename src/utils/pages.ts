import { getPayload } from "payload";
import configPromise from "@payload-config";
import { unstable_cache } from "next/cache";

export const getPage = async (slug: string, depth = 0) => {
  const payload = await getPayload({ config: configPromise });

  const page = await payload.find({
    collection: "pages",
    depth,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return page.docs[0];
};

export const getCachedPage = (slug: string) => {
  return unstable_cache(async () => getPage(slug), [slug], {
    tags: [`pages_${slug}`],
  });
};
