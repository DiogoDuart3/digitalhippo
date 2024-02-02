"use client";

import React from "react";

import { CustomRenderers, Serialize } from "./Serialize";

export const RichText: React.FC<{
  className?: string;
  content: any;
  customRenderers?: CustomRenderers;
}> = ({ className, content, customRenderers }) => {
  if (!content) {
    return null;
  }

  return (
    <div>
      <Serialize content={content} customRenderers={customRenderers} />
    </div>
  );
};
