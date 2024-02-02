"use client";

import * as React from "react";
import { Cell, Grid } from "@faceless-ui/css-grid";

import { BlockSpacing } from "@/components/BlockSpacing";
import { CMSForm } from "@/components/CMSForm";
import { Gutter } from "@/components/Gutter";
import { PixelBackground } from "@/components/PixelBackground";
import { RichText } from "@/components/RichText";
import { Page } from "@/payload-types";

export type FormBlockProps = Extract<Page["layout"][0], { blockType: "form" }>;

const Content: React.FC<FormBlockProps> = (props) => {
  const { formFields: { container, richText, form } = {} } = props;

  if (typeof form === "string") return null;

  return (
    <BlockSpacing>
      <div>
        <Gutter disableMobile>
          <div>
            <div>
              <PixelBackground />
            </div>
          </div>
        </Gutter>
      </div>
      <div>
        <Gutter>
          <Grid>
            <Cell start={7} cols={6} startM={2} colsM={7}>
              <div />
            </Cell>
          </Grid>
        </Gutter>
      </div>
      <Gutter>
        <Grid>
          <Cell cols={6} colsM={8} startM={1}>
            {richText && <RichText content={richText} />}
          </Cell>
          <Cell cols={6} start={8} colsM={8} startM={1}>
            <div>
              <CMSForm form={form} />
            </div>
          </Cell>
        </Grid>
      </Gutter>
    </BlockSpacing>
  );
};

export const FormBlock: React.FC<FormBlockProps> = (props) => {
  const { formFields: { container } = {} } = props;

  if (container) {
    return (
      <div data-theme="dark">
        <Content {...props} />
      </div>
    );
  }

  return <Content {...props} />;
};
