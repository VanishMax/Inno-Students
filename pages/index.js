import React, {useContext} from 'react'
import Layout from '../layouts/default'
import {LangContext} from '../middleware/context'
import Lang from '../langs/home'
import NewsGrid from '../components/news/grid'

const data = [
  {
    img: 'https://images.unsplash.com/photo-1560067017-24140fbbfe86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
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
    img: 'https://images.unsplash.com/photo-1560070094-e1f2ddec4337?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    top: [
      'VanishMax',
      '05-06-2019',
      '5 minutes'
    ],
    title: 'Что вообще происходит с этим сайтом?'
  },
  {
    img: 'https://images.unsplash.com/photo-1559549200-4cae6f9d5535?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
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
    <Layout title={Lang.metatitle[lang]} description={Lang.description[lang]} keywords={Lang.keywords[lang]}>
      <div className="app flex justify-between">
        <NewsGrid data={data} />
      </div>
    </Layout>
  )
}
