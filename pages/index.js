import React from 'react'
import Head from 'next/head'
import Counter from '../components/counter'

const data = [
  {
    img: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    top: [
      'VanishMax',
      '05-06-2019',
      '5 minutes'
    ],
    title: 'Новость дня - кит в океане!'
  },
  {
    img: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
    top: [
      'VanishMax',
      '05-06-2019',
      '5 minutes'
    ],
    title: 'Сегодня мы поговорим про секретную технологию, разработанную в США. Она основана на измельчении грубой кожи ваших врагов'
  },
  {
    img: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=620&q=80',
    top: [
      'VanishMax',
      '05-06-2019',
      '5 minutes'
    ],
    title: 'Что вообще происходит с этим сайтом?'
  },
  {
    img: 'https://images.unsplash.com/photo-1483519173755-be893fab1f46?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1083&q=80',
    top: [
      'VanishMax',
      '05-06-2019',
      '5 minutes'
    ],
    title: 'В очередной раз гость нашей программы - Василий Пуськин. Милости просим'
  }
]

export default class Home extends React.Component {
  render() {

    const neew = i => (
      <React.Fragment>
        <div className="news-card-cover"
             style={{backgroundImage: `url("${data[i].img}")`}}/>
        <div className="news-card-overlay" />
        <div className="news-card-caption">
          <div className="small">
            {data[i].top.map(top => (
              <span key={top}>{top}</span>
            ))}
          </div>
          <div className="big">{data[i].title.length > 70 ? data[i].title.substring(0, 69) + '...' : data[i].title}</div>
        </div>
      </React.Fragment>
    )

    return (
      <div>
        <Head>
          <title>Media Club</title>
          <meta name="description" content="MWA is a progressive solution to build awesome web applications"/>
        </Head>

        <div className="app flex justify-between">
          <div className="news-grid">

            {data.map((news, i) => (
              <React.Fragment>
                {i % 3 === 0 ?
                  <div key={i} className="news-grid-row md:flex-row flex-col">
                    <div className="news-card news-card-big">
                      {neew(i)}
                    </div>
                  </div>
                :
                  <React.Fragment>
                    {i % 3 === 1 ?
                      <div key={i} className="news-grid-row md:flex-row flex-col">
                        <div className="news-card news-card-small md:mr-6 md:mb-0 mb-6">
                          {neew(i)}
                        </div>
                        <div className="news-card news-card-small">
                          {neew(i+1)}
                        </div>
                      </div>
                    :
                      <React.Fragment/>
                    }
                  </React.Fragment>

                }
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
