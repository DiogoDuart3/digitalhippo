import React from 'react'



// TODO: Needed to stub this out to be able to build
const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={classes.wrap}>
      <table>{children}</table>
    </div>
  )
}

export default Table
