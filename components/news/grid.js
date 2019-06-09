import React from 'react'
import NewsCard from './card'

export default ({data}) => {
  return (
    <div className="news-grid">
      <div className="news-grid-row md:flex-row flex-col">
        {data.map((news, i) => (
          <NewsCard key={i} big={i % 3 === 0} news={news} last={i % 3 === 2 || i % 3 === 0} />
        ))}
      </div>
    </div>
  )
}
