import type { CollectionConfig } from "payload/types";

import { isAdmin } from "../access/isAdmin";
import { publishedOnly } from "../access/publishedOnly";
import { Content } from "../blocks/Content";
import { MediaBlock } from "../blocks/Media";
import { ReusableContentBlock } from "../blocks/ReusableContent";
import { fullTitle } from "../fields/fullTitle";
import { hero } from "../fields/hero";
import { slugField } from "../fields/slug";
import { formatPreviewURL } from "../utilities/formatPreviewURL";
import { revalidatePage } from "../utilities/revalidatePage";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "fullTitle",
    preview: (doc) => formatPreviewURL("pages", doc),
    defaultColumns: ["fullTitle", "slug", "createdAt", "updatedAt"],
  },
  versions: {
    drafts: true,
  },
  access: {
    create: isAdmin,
    read: publishedOnly,
    readVersions: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [
      ({ req: { payload }, doc }) => {
        revalidatePage({
          payload,
          collection: "pages",
          doc,
        });
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    fullTitle,
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [hero],
        },
        {
          label: "Content",
          fields: [
            {
              name: "layout",
              type: "blocks",
              required: true,
              blocks: [Content, MediaBlock, ReusableContentBlock],
            },
          ],
        },
      ],
    },
    slugField(),
  ],
};
