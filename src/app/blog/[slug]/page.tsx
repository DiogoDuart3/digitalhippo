import { cookies, draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { BlogPost } from "./BlogPost";
import { getPayloadClient } from "@/get-payload";
import { getServerSideUser } from "@/lib/payload-utils";
import { isAdmin } from "@/access/isAdmin";

const Post = async ({ params }) => {
  const { slug } = params;

  const payload = await getPayloadClient();
  const blogPost = await payload
    .find({
      collection: "posts",
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 1,
      limit: 1,
    })
    .then(({ docs }) => docs[0]);

  if (!blogPost) return notFound();

  const { isEnabled: isDraftMode } = draftMode();
  if (isDraftMode || blogPost._status === "draft") {
    const nextCookies = cookies();
    const { user } = await getServerSideUser(nextCookies);
    if (!user || user.role !== "admin") return notFound();
  }

  if (!blogPost) return notFound();

  return <BlogPost {...blogPost} />;
};

export default Post;

/* export async function generateStaticParams() {
  const posts = await fetchPosts();

  return posts.map(({ slug }) => ({
    slug,
  }));
}
 */
