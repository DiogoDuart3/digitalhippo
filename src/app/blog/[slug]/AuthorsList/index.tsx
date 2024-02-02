import { Fragment } from "react";
import Link from "next/link";

import { Label } from "@/components/Label";
import { Media } from "@/components/Media";
import { Post } from "@/payload-types";

const AuthorContent: React.FC<{
  author: Post["authors"][0];
}> = (props) => {
  const { author } = props;

  if (!author || typeof author === "string") {
    return null;
  }

  return (
    <div className={""}>
      <div className={""}>
        <Label>{`${author?.email || "Unknown"} ${
          author?.email || "Author"
        }`}</Label>
        {/* {author?.twitter && (
          <div className={''}>{`@${author?.twitter}`}</div>
        )} */}
      </div>
      {/* {author?.photo && typeof author?.photo !== "string" && (
        <Media className={''} resource={author?.photo} />
      )} */}
    </div>
  );
};

export const AuthorsList: React.FC<{
  authors: Post["authors"];
}> = (props) => {
  const { authors } = props;

  if (!authors || authors?.length === 0) {
    return null;
  }

  return (
    <div className={""}>
      {authors?.map((author, index) => (
        <Fragment key={index}>
          {author && typeof author !== "string" && (
            <Fragment>
              {/* {false ? (
                <Link
                  className={''}
                  href={`https://twitter.com/${author?.twitter}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <AuthorContent author={author} />
                </Link>
              ) : (
                )} */}
              <AuthorContent author={author} />
            </Fragment>
          )}
        </Fragment>
      ))}
    </div>
  );
};
