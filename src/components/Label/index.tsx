import React from 'react'

export const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <p /* className={[classes.label, className].filter(Boolean).join(' ')} */>{children}</p>
}
