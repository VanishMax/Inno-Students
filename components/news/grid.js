import React from 'react'
import NewsCard from './card'

const NewsRow = ({data}) => {
  if(data.length === 1) {
    const news = data[0]
    return(
      <div className="news-grid-row md:flex-row flex-col">
        <div className="news-card news-card-big">
          <NewsCard news={news} />
        </div>
      </div>
    )
  } else if(data.length === 2) {
    return(
      <div className="news-grid-row md:flex-row flex-col">
        <div className="news-card news-card-small md:mr-6 md:mb-0 mb-6">
          <NewsCard news={data[0]} />
        </div>
        <div className="news-card news-card-small">
          <NewsCard news={data[1]} />
        </div>
      </div>
    )
  }
}

export default ({data}) => {
  let allNews = []
  let i = 0
  while(i !== data.length) {
    if(i % 3 === 0) {
      allNews.push(<NewsRow data={[data[i]]} />)
    } else if(i % 3 === 1) {
      allNews.push(<NewsRow data={[data[i], data[i + 1]]} />)
      i++
    }
    i++;
  }
  return (
    <div className="news-grid">
      {allNews.map((row, i) => (
        <div key="i">
          {row}
        </div>
      ))}
    </div>
  )
}
