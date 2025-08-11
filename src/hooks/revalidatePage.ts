import type { Page } from "@/payload-types";
import { revalidatePath, revalidateTag } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req,
}) => {
  if (!req.context.disableRevalidate) {
    if (doc._status === "published") {
      const path = doc.slug === "home" ? "/" : `/${doc.slug}`;

      revalidatePath(path);
      revalidateTag("pages-sitemap");
    }

    if (previousDoc?._status === "published" && doc._status !== "published") {
      const oldPath =
        previousDoc.slug === "home" ? "/" : `/${previousDoc.slug}`;

      revalidatePath(oldPath);
      revalidateTag("pages-sitemap");
    }
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({
  doc,
  req,
}) => {
  if (!req.context.disableRevalidate) {
    const path = doc?.slug === "home" ? "/" : `/${doc?.slug}`;

    revalidatePath(path);
    revalidateTag("pages-sitemap");
  }

  return doc;
};
