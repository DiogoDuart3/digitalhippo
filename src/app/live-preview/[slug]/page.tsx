import { getPayloadClient } from "@/get-payload";
import { PageClient } from "./PageClient";

export default async function LivePreviewPage({ params }) {
  const { slug } = params;

  const payload = await getPayloadClient();

  const doc = await payload
    .find({
      collection: "posts",
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
    })
    .then(({ docs }) => docs[0]);

  return <PageClient page={doc} />;
}
