import { RichTextCustomElement } from "@payloadcms/richtext-slate"

// @ts-expect-error
const withLargeBody: RichTextCustomElement['plugins'][0] = (incomingEditor: any) => {
  const editor = incomingEditor

  const { shouldBreakOutOnEnter } = editor

  // @ts-expect-error
  editor.shouldBreakOutOnEnter = element =>
    element.type === 'label' ? true : shouldBreakOutOnEnter(element)

  return editor
}

export default withLargeBody
