import React from 'react'

export default ({news}) => {

  return (
    <React.Fragment>
      <div className="news-card-cover"
           style={{backgroundImage: `url("${news.img}")`}}/>
      <div className="news-card-overlay" />
      <div className="news-card-caption">
        <div className="small">
          {news.top.map(top => (
            <span key={top}>{top}</span>
          ))}
        </div>
        <div className="big">{news.title.length > 70 ? news.title.substring(0, 69) + '...' : news.title}</div>
      </div>
    </React.Fragment>
  )
}
