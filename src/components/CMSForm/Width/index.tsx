import * as React from 'react'



export const Width: React.FC<{ width?: number | null; children: React.ReactNode }> = ({
  width,
  children,
}) => {
  return (
    <div className={classes.width} style={{ width: width ? `${width}%` : undefined }}>
      {children}
    </div>
  )
}
