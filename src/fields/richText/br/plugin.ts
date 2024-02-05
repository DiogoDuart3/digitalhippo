import { RichTextCustomElement } from "@payloadcms/richtext-slate"

// @ts-expect-error
const withBr: RichTextCustomElement['plugins'][0] = (incomingEditor: any) => {
  const editor = incomingEditor
  const { isVoid } = editor

  // @ts-expect-error
  editor.isVoid = element => (element.type === 'br' ? true : isVoid(element))

  return editor
}

export default withBr
