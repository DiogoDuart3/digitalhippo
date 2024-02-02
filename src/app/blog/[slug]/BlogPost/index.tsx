"use client";

import React from "react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Gutter } from "@/components/Gutter";
import { Media } from "@/components/Media";
import { RenderBlocks } from "@/components/RenderBlocks";
import { RichText } from "@/components/RichText";
import { AuthorsList } from "../AuthorsList";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Post } from "@/payload-types";

export const BlogPost: React.FC<Post> = (props) => {
  const { title, publishedOn, image, excerpt, content, relatedPosts } = props;

  return (
    <div id="blog">
      <Gutter>
        <Breadcrumbs
          items={[
            {
              label: "Blog Post",
            },
          ]}
          ellipsis={false}
        />
      </Gutter>
      <Gutter>
        <div className="grid">
          <div className="col-psan-9">
            <h1>{title}</h1>
          </div>
          <div className="col-span-3">
            <AuthorsList authors={props.authors} />
            {publishedOn && (
              <div>
                <time dateTime={publishedOn}>
                  {format(new Date(publishedOn), "dd/MM/yyy HH:ii")}
                </time>
                <CalendarIcon />
              </div>
            )}
          </div>
        </div>
      </Gutter>
      <div>
        {/* {typeof image !== "string" && <Media resource={image} priority />} */}
      </div>
      <Gutter>
        <div className="gird">
          <div className="col-span-2">
            <RichText content={excerpt} />
          </div>
        </div>
      </Gutter>
      <RenderBlocks
        blocks={[
          ...(content || []),
          {
            blockType: "relatedPosts",
            blockName: "Related Posts",
            relatedPosts: relatedPosts || [],
          },
        ]}
      />
    </div>
  );
};
