import React from 'react'

import { CloseIcon } from 'lucide-react'
import { PlusIcon } from 'lucide-react'



const icons = {
  add: PlusIcon,
  close: CloseIcon,
}

export const CircleIconButton: React.FC<{
  className?: string
  onClick: () => void
  label: string
  icon?: 'add' | 'close'
}> = ({ children, ...props }: any) => {
  const { onClick, className, label, icon = 'add' } = props

  const Icon = icons[icon]

  return (
    <button
      className={[classes.button, className].filter(Boolean).join(' ')}
      type="button"
      onClick={onClick}
    >
      <div className={classes.iconWrapper}>{Icon && <Icon size="full" />}</div>
      <span className={classes.label}>{label}</span>
    </button>
  )
}
