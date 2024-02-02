import React from "react";
import { Cell, Grid } from "@faceless-ui/css-grid";

import { Gutter } from "@/components/Gutter";
import { Media } from "@/components/Media";
import { RichText } from "@/components/RichText";
import { ReusableContent } from "@/payload-types";


type Props = Extract<ReusableContent["layout"][0], { blockType: "mediaBlock" }>;

export const MediaBlock: React.FC<Props> = ({ mediaBlockFields }) => {
  const { media, caption, position } = mediaBlockFields;

  if (typeof media === "string") return null;

  return (
    <Gutter>
      <Media
        resource={media}
       
      />

      {caption && (
        <Grid>
          <Cell >
            <small>
              <RichText content={caption} />
            </small>
          </Cell>
        </Grid>
      )}
    </Gutter>
  );
};
