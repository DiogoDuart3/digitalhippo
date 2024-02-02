import * as React from 'react'



export const PixelBackground: React.FC<{
  className?: string
}> = props => {
  const { className } = props
  return <div className={[classes.pixelBackground, className].filter(Boolean).join(' ')} />
}
