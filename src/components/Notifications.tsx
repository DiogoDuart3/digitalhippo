"use client";

import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { toast } from "sonner";
import { z } from "zod";
import { useAuth } from "./Providers";
import { pusherClient } from "@/lib/pusher/client";

const MessageSchema = z.object({
  id: z.string(),
  message: z.string(),
});
type TMessageSchema = z.infer<typeof MessageSchema>;

const Notifications = () => {
  const [notifications, setNotifications] = useState<TMessageSchema[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const channel = pusherClient.subscribe("notifications");
    console.log(user);

    channel.bind("notification", (data: any) => {
      const parsedData = MessageSchema.safeParse(data);
      if (!parsedData.success) return;
      toast(parsedData.data.message, {
        onAutoClose: () =>
          setNotifications(notifications.filter((n) => n.id !== data.id)),
      });
      console.log(data);
      setNotifications([...notifications, data]);
    });

    return () => {
      pusherClient.unsubscribe("notifications");
    };
  }, [notifications]);

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
