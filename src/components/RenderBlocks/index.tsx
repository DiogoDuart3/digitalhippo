// @ts-nocheck

"use client";

import { BlogContent } from "@/components/BlogContent";
import { RelatedPosts, RelatedPostsBlock } from "@/components/RelatedPosts";
import React, { Fragment } from "react";

import { BlockSpacing } from "@/components/BlockSpacing";
import { Page, ReusableContent } from "@/payload-types";
import { toKebabCase } from "@/utilities/to-kebab-case";
import { ReusableContentBlock } from "../ReusableContent";

type ReusableContentBlockType = Extract<
  Page["layout"][0],
  { blockType: "reusableContentBlock" }
>;

const blockComponents = {
  /* banner: BannerBlock, */
  blogContent: BlogContent,
  reusableContentBlock: ReusableContentBlock,
  relatedPosts: RelatedPosts,
  /* blogMarkdown: BlogMarkdown,
  caseStudiesHighlight: CaseStudiesHighlightBlock,
  caseStudyCards: CaseStudyCards,
  mediaBlock: MediaBlock,
  code: CodeBlock,
  content: ContentBlock,
  contentGrid: ContentGrid,
  form: FormBlock,
  slider: Slider,
  cardGrid: CardGrid,
  mediaContent: MediaContent,
  steps: Steps,
  stickyHighlights: StickyHighlights,
  hoverHighlights: HoverHighlights,
  codeFeature: CodeFeature, */
  /* cta: CallToAction, */
  /* linkGrid: LinkGrid,
  pricing: Pricing,
  exampleTabs: ExampleTabs, */
};

type Props = {
  blocks: (
    | ReusableContent["layout"][0]
    | ReusableContentBlockType
    | RelatedPostsBlock
  )[];
  disableOuterSpacing?: true;
};

export const RenderBlocks: React.FC<Props> = (props) => {
  const { blocks, disableOuterSpacing } = props;
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            const hasSpacing = ![
              "banner",
              "blogContent",
              "blogMarkdown",
              "code",
              "reusableContentBlock",
            ].includes(blockType);

            let topSpacing = hasSpacing;
            let bottomSpacing = hasSpacing;

            if (disableOuterSpacing && hasSpacing) {
              if (index === 0) topSpacing = false;
              if (index === blocks.length - 1) bottomSpacing = false;
            }

            if (Block) {
              return (
                <BlockSpacing
                  key={index}
                  top={topSpacing}
                  bottom={bottomSpacing}
                >
                  <Block id={toKebabCase(blockName)} {...block} />
                </BlockSpacing>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
