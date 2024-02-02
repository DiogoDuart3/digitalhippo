"use client";

import React, { Fragment, useRef } from "react";
import useIntersection from "@/utilities/useIntersection";

export const Highlight: React.FC<{
  text?: string;
  bold?: boolean;
  className?: string;
  inlineIcon?: React.ReactElement;
  highlightOnHover?: boolean;
  highlight?: boolean;
  reverseIcon?: boolean;
  appearance?: "success" | "danger";
}> = (props) => {
  const {
    bold,
    className,
    text,
    inlineIcon: InlineIcon,
    reverseIcon,
    appearance = "success",
  } = props;

  const ref = useRef(null);

  const { hasIntersected } = useIntersection({
    ref,
    rootMargin: "-75px",
  });

  if (text) {
    const words = text.trim().split(" ");

    if (Array.isArray(words) && words.length > 0) {
      return (
        <span ref={ref}>
          {words.map((word, index) => {
            const isFirstWord = index === 0;
            const isLastWord = index === words.length - 1;

            return (
              <span key={index}>
                <span>
                  {InlineIcon && reverseIcon && isFirstWord && (
                    <span>
                      {InlineIcon}
                      &nbsp;
                    </span>
                  )}
                  {!isLastWord && (
                    <Fragment>
                      {word}
                      &nbsp;
                    </Fragment>
                  )}
                  {isLastWord && (!InlineIcon || reverseIcon) && word}
                  {isLastWord &&
                    InlineIcon &&
                    !reverseIcon && ( // the icon and the last word need to render together, to prevent the icon from widowing
                      <span>
                        {word}
                        &nbsp;
                        {InlineIcon}
                      </span>
                    )}
                </span>
              </span>
            );
          })}
        </span>
      );
    }
  }

  return null;
};
