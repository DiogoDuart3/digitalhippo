import React from 'react'



type Props = {
  id: string
  title: string
}

const YouTube: React.FC<Props> = ({ id, title }) => (
  <div className={classes.wrap}>
    <div className={classes.innerWrap}>
      <iframe
        className={classes.iframe}
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        frameBorder="0"
        allow="autoplay;"
        allowFullScreen
      />
    </div>
  </div>
)

export default YouTube
