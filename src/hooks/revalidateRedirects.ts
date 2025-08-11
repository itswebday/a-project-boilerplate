import { revalidateTag } from "next/cache";
import type { CollectionAfterChangeHook } from "payload";

export const revalidateRedirects: CollectionAfterChangeHook = ({ doc }) => {
  revalidateTag("redirects");

  return doc;
};
