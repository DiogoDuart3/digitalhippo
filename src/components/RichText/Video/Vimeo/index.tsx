import React from 'react'

export const VimeoPlayer: React.FC<{
  videoID?: string
}> = ({ videoID }) => {
  return (
    <iframe
      title="Vimeo player"
      src={`https://player.vimeo.com/video/${videoID}}`}
      frameBorder="0"
      allowFullScreen
      allow="autoplay; fullscreen; picture-in-picture"
    />
  )
}
