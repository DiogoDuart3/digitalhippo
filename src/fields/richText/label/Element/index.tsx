import React from "react";

const baseClass = "rich-text-label-element";

const LabelElement: React.FC<{
  attributes: any;
  element: any;
  children: React.ReactNode;
}> = ({ attributes, children }) => (
  <span {...attributes}>
    <span className={baseClass}>{children}</span>
  </span>
);
export default LabelElement;
