import { getServerSideUser } from "@/lib/payload-utils";
import { getPusherInstance } from "@/lib/pusher/server";
import { TRPCError } from "@trpc/server";
import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";
import { z } from "zod";

const SocketConnectionRequestBodySchema = z.object({
  socket_id: z.string(),
  channel_name: z.string().startsWith("private-"),
});

const pusher = getPusherInstance();

export async function POST(req: NextRequest) {
  const parsedBody = await SocketConnectionRequestBodySchema.parseAsync(
    req.body
  );

  const socketId = parsedBody.socket_id;
  const channel = parsedBody.channel_name;

  const { cookies } = req;
  const session = await getServerSideUser(cookies);

  if (session.user?.id) {
    const authResponse = pusher.authorizeChannel(socketId, channel);
    return new Response(JSON.stringify(authResponse));
  } else {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
}
