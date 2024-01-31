"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import PusherClient from "pusher-js";
import { useAuth } from "./Providers";
import { pusherClient } from "@/lib/pusher/client";

const MessageSchema = z.object({
  id: z.string(),
  message: z.string(),
});
type TMessageSchema = z.infer<typeof MessageSchema>;

const Notifications = () => {
  const [notifications, setNotifications] = useState<TMessageSchema[]>([]);
  const [channelName, setChannelName] = useState<string | null | undefined>();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      if (channelName) pusherClient.unsubscribe(channelName);
      return;
    }
    const channelNameCurr = `private-notifications-${user.id}`;
    setChannelName(channelNameCurr);
    console.log(user);
    console.log(channelNameCurr);

    const channel = pusherClient.subscribe(channelNameCurr);

    channel.bind("pusher:subscription_succeeded", (data: any) => {
      console.log(data);
    });

    channel.bind("pusher:subscription_error", function (data: any) {
      console.error("Unable to connect to pusher channel", data);
    });

    channel.bind("notification", (data: any) => {
      console.log(data);
      const parsedData = MessageSchema.safeParse(data);
      if (!parsedData.success) {
        return console.log(parsedData.error);
      }
      toast(parsedData.data.message, {
        onAutoClose: () =>
          setNotifications(notifications.filter((n) => n.id !== data.id)),
      });
      setNotifications([...notifications, data]);
    });

    return () => {
      pusherClient.unbind_all();
      pusherClient.unsubscribe(channelNameCurr);
    };
  }, [notifications, user]);

  return (
    <div>
      {JSON.stringify(user)}
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
