import React from 'react'



export const LargeBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className={classes.largeBody}>{children}</p>
}
