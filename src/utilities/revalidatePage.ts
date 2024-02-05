import type { Payload } from 'payload'

import { revalidate } from './revalidate'
import { Page, Post } from '@/payload-types'

export const revalidatePage = async ({
  doc,
  collection,
  payload,
}: {
  doc: any // eslint-disable-line
  collection: string
  payload: Payload
}): Promise<void> => {
  if (doc._status === 'published') {
    revalidate({ payload, collection, slug: doc.slug })
  }
}

export const formatAppURL = ({ doc }: {doc: Page | Post}): string => {
  const pathToUse = doc.slug === 'home' ? '' : doc.slug
  const { pathname } = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}/${pathToUse}`)
  return pathname
}
