'use client'

import React from 'react'
import Marquee from 'react-fast-marquee'
import Image from 'next/image'

import { ChangeHeaderTheme } from '@/components/ChangeHeaderTheme'
import { CMSLink } from '@/components/CMSLink'
import CreatePayloadApp from '@/components/CreatePayloadApp'
import { Gutter } from '@/components/Gutter'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import { Page } from '@/payload-types'
import useIsMounted from '@root/utilities/use-is-mounted'



export const HomeHero: React.FC<Page['hero']> = ({
  richText,
  adjectives,
  actions,
  // buttons,
  media,
}) => {
  const isMounted = useIsMounted()

  return (
    <div className={classes.homeHero}>
      <div data-theme="dark" className={classes.wrap}>
        <ChangeHeaderTheme theme="dark">
          <div className={classes.bg}>
            <Marquee gradient={false} speed={35}>
              <div className={classes.bgImage}>
                <Image
                  priority
                  src="/images/home-bg.png"
                  fill
                  alt="Screenshots of Payload"
                  sizes="191vh" // aspect ratio of png, translates to 100vh
                />
              </div>
            </Marquee>
          </div>
          <div className={classes.contentWrap}>
            <Gutter>
              <div className={classes.content}>
                <RichText className={classes.richText} content={richText} />
                <div className={classes.sidebar}>
                  {Array.isArray(actions) && (
                    <ul className={classes.actions}>
                      {actions.map(({ link }, i) => {
                        return (
                          <li key={i}>
                            <CMSLink {...link} appearance="default" fullWidth />
                          </li>
                        )
                      })}
                    </ul>
                  )}
                  <CreatePayloadApp />
                  {/* Not going to render buttons until Payload Cloud */}
                  {/* {Array.isArray(buttons) && (
                    <ul className={classes.buttons}>
                      {buttons.map(({ link }, i) => {
                        return (
                          <li key={i}>
                            <CMSLink {...link} />
                          </li>
                        )
                      })}
                    </ul>
                  )} */}
                </div>
              </div>
              <hr />
            </Gutter>
            {!isMounted && (
              <div className={`${classes.adjectives} ${classes.placeholder}`}>
                <span className={classes.adjective}>sean sean</span>
              </div>
            )}
            {Array.isArray(adjectives) && (
              <Marquee gradient={false} speed={70} className={classes.adjectives}>
                {adjectives.map(({ adjective }, i) => (
                  <span key={i} className={classes.adjective}>
                    {adjective}
                  </span>
                ))}
              </Marquee>
            )}

            {typeof media === 'object' && media !== null && (
              <Gutter>
                <div className={classes.padForMedia} />
              </Gutter>
            )}
          </div>
        </ChangeHeaderTheme>
      </div>

      {typeof media === 'object' && media !== null && (
        <Gutter className={classes.mediaGutter}>
          <Media resource={media} className={classes.media} />
        </Gutter>
      )}
    </div>
  )
}
