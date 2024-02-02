import type { Payload } from "payload";

export const revalidate = async (args: {
  collection: string;
  slug: string;
  payload: Payload;
}): Promise<void> => {
  const { collection, slug, payload } = args;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/revalidate?secret=${process.env.REVALIDATION_KEY}&collection=${collection}&slug=${slug}`
    );

    if (res.ok) {
      payload.logger.info(
        `Revalidated page '${slug}' in collection '${collection}'`
      );
    } else {
      payload.logger.error(
        `Error revalidating page '${slug}' in collection '${collection}': ${res}`
      );
    }
  } catch (err: unknown) {
    payload.logger.error(
      `Error hitting revalidate route for page '${slug}' in collection '${collection}': ${err}`
    );
  }
};

export const revalidatePage = async ({
  doc,
  collection,
  payload,
}: {
  doc: any;
  collection: string;
  payload: Payload;
}): Promise<void> => {
  if (doc._status === "published") {
    revalidate({ payload, collection, slug: doc.slug });
  }
};
