
import { RichTextCustomElement } from '@payloadcms/richtext-slate'
import Button from './Button'
import Element from './Element'
import { withLargeBody } from './plugin'

const largeBody: RichTextCustomElement = {
  name: 'large-body',
  Button,
  Element,
  plugins: [withLargeBody],
}

export default largeBody
