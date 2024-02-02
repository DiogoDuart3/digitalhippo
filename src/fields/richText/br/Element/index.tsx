import React from "react";
import { useFocused, useSelected } from "slate-react";

type Source = "youtube" | "vimeo";

const sourceLabels: Record<Source, string> = {
  youtube: "YouTube",
  vimeo: "Vimeo",
};

const Element = (props) => {
  const { attributes, children, element } = props;
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div contentEditable={false} {...attributes}>
      <div>
        <div>Spacer</div>
      </div>
      {children}
    </div>
  );
};

export default Element;
