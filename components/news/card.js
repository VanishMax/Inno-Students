import React from 'react'
import Router from 'next/router'
import {bucket} from '../../constants/user'
import prettyDate from '../../middleware/prettyDate'

export default ({news, big, last, lang}) => {
  const url = `url("${bucket + news.img}")`

  let top = []
  top.push(news.author[lang].name ? news.author[lang].name + ' ' + news.author[lang].surname : news.author.username)
  top.push(news.tag)
  top.push(prettyDate(news.publishTime, lang))
  if(news.exclusive === 'en') top.push(lang === 'en' ? 'English' : 'Английский')
  if(news.exclusive === 'ru') top.push(lang === 'en' ? 'Russian' : 'Русский')

  const redirect = () => {
    Router.push({
      pathname: '/post',
      query: {slug: news.url}
    }, '/post/' + news.url + (lang === 'ru' ? '?lang=ru' : ''))
  }

  return (
    <React.Fragment>
      <div onClick={redirect}
        className={'news-card' + (last ? '' : ' md:mr-6 md:mb-0 mb-6') + (big ? ' big' : '')}>
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
