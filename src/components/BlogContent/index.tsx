import React from "react";
import { Cell, Grid } from "@faceless-ui/css-grid";

import { Gutter } from "@/components/Gutter";
import { RichText } from "@/components/RichText";
import { ReusableContent } from "@/payload-types";

type Props = Extract<
  ReusableContent["layout"][0],
  { blockType: "blogContent" }
>;

export const BlogContent: React.FC<Props> = ({ blogContentFields }) => {
  return (
    <Gutter>
      <div className="grid">
        <div>
          <RichText content={blogContentFields.richText} />
        </div>
      </div>
    </Gutter>
  );
};
