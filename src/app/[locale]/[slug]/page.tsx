import { PreviewListener } from "@/components";
import { blockComponents } from "@/blocks";
import { DEFAULT_LOCALE } from "@/constants";
import { LocaleOption } from "@/types";
import { getMetadata } from "@/utils/server";
import configPromise from "@payload-config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import React, { cache } from "react";

type PageProps = {
  params: Promise<{
    locale: string;
    slug?: string;
  }>;
};

const Page = async ({ params }: PageProps) => {
  const draft = await draftMode();
  const { locale = DEFAULT_LOCALE, slug = "home" } = await params;
  const page = await queryPageBySlug({
    locale: locale,
    slug: slug,
  });

  if (!page) {
    notFound();
  }

  const blocks = page.blocks;

  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <article>
      {draft.isEnabled && <PreviewListener />}

      {/* Rendering blocks */}
      {blocks && Array.isArray(blocks) && blocks.length > 0 && (
        <>
          {blocks.map((block, index) => {
            const BlockComponent = blockComponents[
              block.blockType
            ] as React.ComponentType<typeof block>;

            if (BlockComponent) {
              return <BlockComponent key={index} {...block} />;
            }

            return null;
          })}
        </>
      )}
    </article>
  );
};

export default Page;

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale = DEFAULT_LOCALE, slug = "home" } = await params;
  const page = await queryPageBySlug({
    locale: locale,
    slug: slug,
  });

  return getMetadata({ page: page });
};

export const dynamic = "force-dynamic";

const queryPageBySlug = cache(
  async ({ slug, locale }: { slug: string; locale: string }) => {
    try {
      const payload = await getPayload({ config: configPromise });
      const pageResult = await payload.find({
        collection: "pages",
        locale: (locale as LocaleOption) || DEFAULT_LOCALE,
        draft: false,
        limit: 1,
        pagination: false,
        overrideAccess: false,
        where: {
          slug: {
            equals: slug,
          },
        },
      });

      return pageResult.docs?.[0] || null;
    } catch (err) {
      console.error(err);

      return null;
    }
  },
);
