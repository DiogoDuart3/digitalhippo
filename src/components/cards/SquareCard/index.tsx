import React from "react";

import { CMSLink } from "@/components/CMSLink";
import { SquareCardProps } from "../types";
import { ArrowRightIcon } from "lucide-react";

export const SquareCard: React.FC<SquareCardProps> = (props) => {
  const { title, className, leader, description } = props;
  const link = props.link || {};
  const hasLink = link.url || link.reference;

  return (
    <div
    /* className={[className, classes.card, !hasLink && classes.noLink].filter(Boolean).join(' ')} */
    >
      <CMSLink /* className={classes.link} */ {...props.link}>
        <div /* className={classes.bg} */ />
        {leader && <span /* className={classes.leader} */>{leader}</span>}
        <div /* className={classes.spacer} */ />
        <div /* className={classes.content} */>
          <div /* className={classes.titleWrapper} */>
            <h3 /* className={classes.title} */>{title}</h3>
            {description && (
              <div /* className={classes.description} */>{description}</div>
            )}
          </div>
        </div>
        <ArrowRightIcon /* className={classes.arrow} */ />
      </CMSLink>
    </div>
  );
};
