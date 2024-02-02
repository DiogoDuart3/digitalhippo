import React from "react";

export const EdgeScroll: React.FC<{
  children: React.ReactNode;
  className?: string;
  element?: keyof JSX.IntrinsicElements;
  mobileOnly?: boolean;
}> = ({ children, element = "div", className, mobileOnly }) => {
  const Element = element;

  return (
    <Element>
      <div />
      {children}
      <div />
    </Element>
  );
};
