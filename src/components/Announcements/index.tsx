"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { RichText } from "@/components/RichText";
import { ArrowRightIcon } from "lucide-react";
import { XIcon } from "lucide-react";
import type { Announcement } from '../../payload-types'
import { cookies } from "next/headers";

export const Announcements: React.FC<{ announcements: Announcement[] }> = ({
  announcements,
}) => {
  const dismissed = cookies().get("dismissAnnouncement");
  const [closeAnnouncement, setCloseAnnouncement] = React.useState(false);
  const pathname = usePathname();
  const onDocsPage = pathname?.startsWith("/docs");
  const [showAnnouncement, setShowAnnouncement] = React.useState(false);

  React.useEffect(() => {
    const newShow = !closeAnnouncement && !cookies.dismissAnnouncement;
    setShowAnnouncement(newShow);
  }, [closeAnnouncement, cookies.dismissAnnouncement]);

  return (
    <div>
      {showAnnouncement &&
        announcements.map((announcement, index) => {
          const { content } = announcement;

          return (
            <div key={index}>
              <div>
                <RichText content={content} />
                <ArrowRightIcon />
              </div>
              <button
                onClick={() => {
                  setCloseAnnouncement(true);
                  setCookie("dismissAnnouncement", true, { maxAge: 34560000 }); // 400 days (max allowed by cookie)
                }}
              >
                <XIcon />
              </button>
            </div>
          );
        })}
    </div>
  );
};
