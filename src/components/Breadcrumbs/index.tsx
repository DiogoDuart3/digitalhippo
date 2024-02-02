import * as React from "react";
import Link from "next/link";

import { EdgeScroll } from "@/components/EdgeScroll";

export type Breadcrumb = {
  label?: string | null;
  url?: string | null;
};

export type Props = {
  items?: Array<Breadcrumb> | null;
  ellipsis?: boolean;
};

export const Breadcrumbs: React.FC<Props> = ({ items, ellipsis = true }) => {
  return (
    <EdgeScroll element="nav">
      {items?.map((item, index) => {
        const isLast = index === items.length - 1;
        const doEllipsis =
          ellipsis && (item?.label || "")?.length > 8 && !isLast;

        if (item?.url && typeof item.url === "string" && !isLast) {
          return (
            <React.Fragment key={index}>
              <label>
                <Link href={item.url} prefetch={false}>
                  {item.label}
                </Link>
              </label>
              {/* {!isLast && <p className={classes.divider}>&nbsp;&#47;&nbsp;</p>} */}
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={index}>
            <label
            /*  className={[classes.label, doEllipsis && classes.ellipsis].filter(Boolean).join(' ')} */
            >
              <div>{item.label}</div>
            </label>
            {!isLast && <p>&nbsp;/&nbsp;</p>}
          </React.Fragment>
        );
      })}
    </EdgeScroll>
  );
};
