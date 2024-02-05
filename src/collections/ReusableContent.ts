import type { CollectionConfig } from 'payload/types'

import { isAdmin } from '../access/isAdmin'
import { BlogContent } from '../blocks/BlogContent'

export const ReusableContent: CollectionConfig = {
  slug: 'reusable-content',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: isAdmin,
    read: () => true,
    readVersions: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  labels: {
    singular: 'Reusable Content',
    plural: 'Reusable Contents',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [
        // Banner,
        BlogContent,
        // BlogMarkdown,
        // CallToAction,
        // CardGrid,
        // CaseStudyCards,
        // CaseStudiesHighlight,
        // Code,
        // CodeFeature,
        // Content,
        // ContentGrid,
        // ExampleTabs,
        // Form,
        // HoverHighlights,
        // LinkGrid,
        // MediaBlock,
        // MediaContent,
        // Pricing,
        // Slider,
        // Steps,
        // StickyHighlights,
      ],
    },
  ],
}
