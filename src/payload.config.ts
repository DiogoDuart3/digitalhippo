import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import dotenv from "dotenv";
import path from "path";
import { buildConfig } from "payload/config";
import { Media } from "./collections/Media";
import { Orders } from "./collections/Orders";
import { ProductFiles } from "./collections/ProductFile";
import { Products } from "./collections/Products/Products";
import { Users } from "./collections/Users";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { Posts } from "./collections/Posts";
import { ReusableContent } from "./collections/ReusableContent";
import { Pages } from "./collections/Pages";
import richText from "./fields/richText";
import formBuilder from "@payloadcms/plugin-form-builder";
import { formatPreviewURL } from "./utilities/formatPreviewURL";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const adapter = s3Adapter({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    },
    region: process.env.S3_REGION,
  },
  bucket: process.env.S3_BUCKET as string,
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [
    Users,
    Products,
    Media,
    ProductFiles,
    Orders,
    ReusableContent,
    Pages,
    Posts,
  ],
  routes: {
    admin: "/sell",
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- DigitalHippo",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg",
    },
    livePreview: {
      url: ({ data, documentInfo }) =>
        `${process.env.PAYLOAD_PUBLIC_APP_URL}/live-preview/${data.slug}`,
      collections: ["pages", "posts"],
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter,
        },
      },
    }),
    formBuilder({
      formOverrides: {
        fields: [
          richText(
            {
              name: "leader",
              label: "Leader Text",
            },
            {
              elements: [],
            }
          ),
          {
            name: "hubSpotFormID",
            type: "text",
            admin: {
              position: "sidebar",
            },
          },
        ],
      },
      formSubmissionOverrides: {
        hooks: {
          afterChange: [
            ({ doc, req }) => {
              const sendSubmissionToHubSpot = async (): Promise<void> => {
                const { form, submissionData } = doc;
                const portalID = process.env.PRIVATE_HUBSPOT_PORTAL_KEY;
                const data = {
                  fields: submissionData.map((key: any) => ({
                    name: key.field,
                    value: key.value,
                  })),
                  context: {
                    hutk: req.body?.hubspotCookie,
                    pageUri: req.body?.pageUri,
                    pageName: req.body?.pageName,
                  },
                };
                try {
                  await fetch(
                    `https://api.hsforms.com/submissions/v3/integration/submit/${portalID}/${form.hubSpotFormID}`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                    }
                  );
                } catch (err: unknown) {
                  req.payload.logger.error({
                    msg: "Fetch to HubSpot form submissions failed",
                    err,
                  });
                }
              };
              sendSubmissionToHubSpot();
            },
          ],
        },
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
