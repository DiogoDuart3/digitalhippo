import React from 'react'

import { Props } from './types'



const Error: React.FC<Props> = props => {
  const { showError, message } = props

  if (showError) {
    return <p className={classes.error}>{message}</p>
  }

  return null
}

export default Error
