import React from 'react'



export type Props = {
  children: React.ReactNode
  className?: string
}

export const MenuContent: React.FC<Props> = ({ children, className }) => {
  const tooltipClasses = [classes.menuContent, className].filter(Boolean).join(' ')

  return <aside className={tooltipClasses}>{children}</aside>
}
