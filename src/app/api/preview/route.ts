import { getServerSideUser } from "@/lib/payload-utils";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
  const token = req.cookies.get("payload-token")?.value;
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const secret = searchParams.get("secret");

  console.log("hit", url, secret);

  if (!url) {
    return new Response("No URL provided", { status: 404 });
  }

  /* if (!token) {
    new Response("You are not allowed to preview this page", { status: 403 });
  } */

  const { cookies } = req;
  const { user } = await getServerSideUser(cookies);
  console.log("user:", user);

  if (!user.id) {
    draftMode().disable();
    return new Response("You are not allowed to preview this page", {
      status: 403,
    });
  }

  if (secret !== process.env.PAYLOAD_PUBLIC_DRAFT_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  draftMode().enable();

  redirect(url);
}
