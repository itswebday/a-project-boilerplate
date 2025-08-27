import { authenticated, authenticatedOrPublished } from "@/access";
import type { CollectionConfig } from "payload";

export const NavigationLinks: CollectionConfig = {
  slug: "navigation-links",
  labels: {
    singular: "Navigation link",
    plural: "Navigation links",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["text", "page"],
    useAsTitle: "text",
  },
  fields: [
    {
      name: "text",
      label: "Text",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "page",
      label: "Page",
      type: "relationship",
      relationTo: "pages",
      required: true,
    },
  ],
};
