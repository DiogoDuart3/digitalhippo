import { RichTextCustomElement } from "@payloadcms/richtext-slate";

// @ts-expect-error
export const withLargeBody: RichTextCustomElement["plugins"][0] = (
  incomingEditor: any
) => {
  const editor = incomingEditor;
  
  const { shouldBreakOutOnEnter } = editor;

  // @ts-expect-error
  editor.shouldBreakOutOnEnter = (element) =>
    element.type === "large-body" ? true : shouldBreakOutOnEnter(element);

  return editor;
};
