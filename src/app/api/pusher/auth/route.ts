import { getServerSideUser } from "@/lib/payload-utils";
import { getPusherInstance } from "@/lib/pusher/server";
import { TRPCError } from "@trpc/server";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const pusher = getPusherInstance();

export async function POST(req: NextRequest) {
  const data = await req.text();
  const [socketId, channelName] = data
    .split("&")
    .map((str) => str.split("=")[1]);

  const { cookies } = req;
  const { user } = await getServerSideUser(cookies);

  if (!user) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 401,
      }
    );
  }
  
  if (channelName.startsWith("private-notifications-")) {
    if (user.id !== channelName.split("private-notifications-")[1])
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        }
      );
  }

  const authResponse = pusher.authorizeChannel(socketId, channelName);

  return new Response(JSON.stringify(authResponse));
}
