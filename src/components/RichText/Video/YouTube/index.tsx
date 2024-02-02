import React from 'react'

export const YouTubePlayer: React.FC<{
  videoID?: string
}> = ({ videoID }) => {
  return (
    <iframe
      title="YouTube player"
      src={`https://www.youtube.com/embed/${videoID}`}
      frameBorder="0"
      allow="autoplay; fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}
