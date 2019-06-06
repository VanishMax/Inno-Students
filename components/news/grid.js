import React from 'react'
import NewsCard from './card'

const NewsRow = ({data}) => {
  return (
    <div className="news-grid-row md:flex-row flex-col">
      {data.length === 1 ?
        <NewsCard news={data[0]} big />
      :
        <React.Fragment>
          <NewsCard news={data[0]} margin />
          <NewsCard news={data[1]} />
        </React.Fragment>
      }
    </div>
  )
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
        <div key={i}>
          {row}
        </div>
      ))}
    </div>
  )
}
