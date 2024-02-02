import { isAdmin } from "../access/isAdmin";
import { publishedOnly } from "../access/publishedOnly";
import richText from "../fields/richText";
import { revalidatePage } from "../utilities/revalidate";
import { revalidatePath } from "next/cache";
import { CollectionConfig } from "payload/types";
import { slugField } from "../fields/slug";
import { formatPreviewURL } from "../utilities/formatPreviewURL";
import { Banner } from "../blocks/Banner";
import { BlogContent } from "../blocks/BlogContent";
import { BlogMarkdown } from "../blocks/BlogMarkdown";
import { MediaBlock } from "../blocks/Media";
import { ReusableContent } from "../blocks/ReusableContent";
import { Code } from "../blocks/Code";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    preview: (doc) => formatPreviewURL("posts", doc),
  },
  versions: { drafts: true },
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
        revalidatePage({ payload, collection: "posts", doc });
      },
    ],
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    richText({
      name: "excerpt",
    }),
    {
      name: "content",
      type: "blocks",
      blocks: [
        Banner,
        BlogContent,
        Code,
        BlogMarkdown,
        MediaBlock,
        ReusableContent,
      ],
      required: true,
    },
    {
      name: "relatedPosts",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        };
      },
    },
    slugField(),
    {
      name: "authors",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedOn",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
    },
  ],
};
