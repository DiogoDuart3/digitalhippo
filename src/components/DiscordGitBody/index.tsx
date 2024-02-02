import React from 'react'



export const DiscordGitBody: React.FC<{ body?: string; platform?: 'GitHub' | 'Discord' }> = ({
  body,
  platform,
}) => {
  return (
    <div
      className={[classes.body, platform && classes[platform]].filter(Boolean).join(' ')}
      dangerouslySetInnerHTML={{ __html: body || '' }}
    />
  )
}
