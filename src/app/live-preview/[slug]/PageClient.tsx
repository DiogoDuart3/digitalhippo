"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import { Post as PostType } from "@/payload-types";
import { BlogPost } from "@/app/blog/[slug]/BlogPost";

// Fetch the page in a server component, pass it to the client component, then thread it through the hook
// The hook will take over from there and keep the preview in sync with the changes you make
// The `data` property will contain the live data of the document
export const PageClient: React.FC<{
  page: PostType;
}> = ({ page: initialPage }) => {
  const { data } = useLivePreview<PostType>({
    initialData: initialPage,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL as string,
    depth: 2,
  });

  return <BlogPost {...data} />;
};
