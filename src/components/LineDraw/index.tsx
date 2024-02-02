'use client'

import React from 'react'



export const LineDraw: React.FC<{
  className?: string
  active?: Boolean | null
  align?: 'top' | 'bottom'
  disabled?: Boolean | null
}> = ({ className, active: isHovered, align = 'top', disabled }) => {
  return (
    <div
      className={[
        classes.lineDraw,
        className,
        !disabled && isHovered && classes.isHovered,
        align && classes[align],
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}
