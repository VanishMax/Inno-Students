import React from 'react'

export default ({news, big, margin}) => {

  return (
    <div className={'news-card news-card-' + (big ? 'big' : 'small') + (margin ? ' md:mr-6 md:mb-0 mb-6' : '')}>
      <div className="news-card-cover"
           style={{backgroundImage: `url("${news.img}")`}}/>
      <div className="news-card-overlay" />
      <div className="news-card-caption">
        <div className="small">
          {news.top.map(top => (
            <span key={top}>{top}</span>
          ))}
        </div>
        <div className="big">{news.title}</div>
      </div>
    </div>
  )
}
