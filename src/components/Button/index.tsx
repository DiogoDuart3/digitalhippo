"use client";

import React, { forwardRef, HTMLAttributes, useState } from "react";
import Link from "next/link";

import { LineBlip } from "@/components/LineBlip";
import { ArrowRightIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { SearchIcon } from "lucide-react";
import { Page } from "@/payload-types";
// eslint-disable-next-line import/no-cycle
import { LinkType, Reference } from "../CMSLink";

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  appearance?:
    | "default"
    | "text"
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | null;
  el?: "button" | "link" | "a" | "div";
  href?: string | null;
  newTab?: boolean | null;
  label?: string | null;
  labelStyle?: "mono" | "regular";
  icon?: false | "arrow" | "search" | "github" | "plus";
  fullWidth?: boolean;
  mobileFullWidth?: boolean;
  type?: LinkType;
  reference?: Reference;
  htmlButtonType?: "button" | "submit";
  size?: "pill" | "default";
  disabled?: boolean;
  disableLineBlip?: boolean;
  url?: string | null;
};

const icons = {
  arrow: ArrowRightIcon,
  search: SearchIcon,
  plus: PlusIcon,
};

type GenerateSlugType = {
  type?: LinkType;
  url?: string | null;
  reference?: Reference;
};
const generateHref = (args: GenerateSlugType): string => {
  const { reference, url, type } = args;

  if ((type === "custom" || type === undefined) && url) {
    return url;
  }

  if (
    type === "reference" &&
    reference?.value &&
    typeof reference.value !== "string"
  ) {
    if (reference.relationTo === "pages") {
      const value = reference.value as Page;
      const breadcrumbs = value?.breadcrumbs;
      const hasBreadcrumbs =
        breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0;
      if (hasBreadcrumbs) {
        return breadcrumbs[breadcrumbs.length - 1]?.url as string;
      }
    }

    if (reference.relationTo === "posts") {
      return `/blog/${reference.value.slug}`;
    }

    if (reference.relationTo === "case_studies") {
      return `/case-studies/${reference.value.slug}`;
    }

    return `/${reference.relationTo}/${reference.value.slug}`;
  }

  return "";
};

const ButtonContent: React.FC<ButtonProps> = (props) => {
  const { icon, label, labelStyle = "mono" } = props;

  // const Icon = icon ? icons[icon] : null
  const Icon = null;

  return (
    <div>
      {label && <div>{label}</div>}
      {Icon && label && <div />}
      {Icon && <Icon />}
    </div>
  );
};

const elements: {
  [key: string]: React.ElementType;
} = {
  a: "a",
  button: "button",
  div: "div",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      el = "button",
      type,
      reference,
      newTab,
      appearance = "default",
      className: classNameFromProps,
      onClick,
      fullWidth,
      mobileFullWidth,
      htmlButtonType = "button",
      size = "default",
      disabled,
      href: hrefFromProps,
      disableLineBlip,
      url,
    } = props;

    const href = hrefFromProps || generateHref({ type, reference, url });
    const [isHovered, setIsHovered] = useState(false);

    const newTabProps = newTab
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    if (el === "link") {
      return (
        <Link href={href} prefetch={false} legacyBehavior passHref>
          <a
            {...newTabProps}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          >
            {appearance === "default" && !disableLineBlip && (
              <LineBlip active={isHovered} />
            )}
            <ButtonContent {...props} />
          </a>
        </Link>
      );
    }

    const Element = elements[el];

    if (Element) {
      return (
        <Element
          ref={ref}
          type={htmlButtonType}
          {...newTabProps}
          href={href || null}
          onClick={onClick}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          disabled={disabled}
        >
          {size !== "pill" && appearance === "default" && !disableLineBlip && (
            <LineBlip active={isHovered} />
          )}
          <ButtonContent {...props} />
        </Element>
      );
    }

    return null;
  }
);

Button.displayName = "Button";
