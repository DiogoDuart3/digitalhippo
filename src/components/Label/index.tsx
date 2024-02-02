import React from "react";

export const Label: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <p>{children}</p>;
};
