import React from 'react'
import dynamic from 'next/dynamic'



const Component = dynamic(() => import('./Component'))

export const DocSearch: React.FC = () => {
  return (
    <div className={classes.docSearch}>
      <React.Suspense>
        <Component />
      </React.Suspense>
    </div>
  )
}
