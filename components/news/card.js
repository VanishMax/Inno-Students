import React from 'react'
import {bucket} from '../../constants/user'

export default ({news, big, last, lang}) => {
  const url = `url("${bucket + news.img}")`

  let top = []
  top.push(news.tag)
  top.push(news.author[lang].name ? news.author[lang].name + ' ' + news.author[lang].surname : news.author.username)
  top.push(news.creationDate)

  return (
    <React.Fragment>
      <div className={'news-card' + (last ? '' : ' md:mr-6 md:mb-0 mb-6') + (big ? ' big' : '')}>
        <div className="news-card-cover" style={{backgroundImage: url}}/>
        <div className="news-card-overlay" />
        <div className="news-card-caption">
          <div className="small">
            {top.map((top, i) => (
              <span key={i}>{top}</span>
            ))}
          </div>
          <div className="big">{news[lang].title}</div>
        </div>
      </div>
      { last && <br className="fullBr" /> }
    </React.Fragment>
  )
}
