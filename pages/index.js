import React, {useContext} from 'react'
import Head from 'next/head'
import {LangContext} from '../middleware/context'
import Lang from '../langs/home'
import NewsGrid from '../components/news/grid'

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

export default () => {
  const lang = useContext(LangContext)
  return (
    <div>
      <Head>
        <title>{Lang.metatitle[lang]} | InnoStudents</title>
        <meta name="description" content={Lang.description[lang]}/>
        <meta name="keywords" content={Lang.keywords[lang]}/>
        <meta name="og:image" content="static/images/square.png"/>
        <meta name="og:type" content="website"/>
      </Head>

      <div className="app flex justify-between">
        <NewsGrid data={data} />
      </div>
    </div>
  )
}
