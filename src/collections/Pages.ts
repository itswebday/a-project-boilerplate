import { authenticated, authenticatedOrPublished } from "@/access";
import { blockConfigs } from "@/blocks/config";
import { SlugField } from "@/fields";
import { populatePublishedAt, revalidateDelete, revalidatePage } from "@/hooks";
import { getPreviewPath } from "@/utils/server";
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig<"pages"> = {
  slug: "pages",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: async ({ data, req }) => {
        const path = await getPreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          req,
        });

        return path;
      },
    },
    preview: async (data, { req }) =>
      await getPreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        req,
      }),
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      localized: true,
      unique: true,
      required: true,
    },
    SlugField({
      generatedFrom: "title",
      description: "Page URL (automatically generated from the title)",
    }),
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "blocks",
              label: "Blocks",
              type: "blocks",
              blocks: blockConfigs,
              defaultValue: [],
            },
          ],
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "dd-MM-yyyy HH:mm",
        },
        position: "sidebar",
      },
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
