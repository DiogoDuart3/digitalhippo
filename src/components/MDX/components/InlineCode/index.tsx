import React from 'react'



const InlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className={classes.wrap}>
    <code>{children}</code>
  </span>
)

export default InlineCode
