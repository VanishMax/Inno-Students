import React, {useContext} from 'react'
import Layout from '../layouts/default'
import {LangContext} from '../middleware/context'
import Lang from '../langs/home'
import NewsGrid from '../components/news/grid'

const data = [
  {
    img: 'https://images.unsplash.com/photo-1560067017-24140fbbfe86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    en: {
      title: 'News of the day - whale in the ocean'
    },
    ru: {
      title: 'Новость дня - кит в океане!'
    },
    author: {
      en: {
        name: 'Vanish',
        surname: 'Max'
      },
      ru: {
        name: 'Vanish',
        surname: 'Max'
      }
    },
    creationDate: '05-06-2019',
    tag: 'Article'
  },
  {
    img: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
    en: {
      title: 'News of the day - whale in the ocean'
    },
    ru: {
      title: 'Новость дня - кит в океане!'
    },
    author: {
      en: {
        name: 'Vanish',
        surname: 'Max'
      },
      ru: {
        name: 'Vanish',
        surname: 'Max'
      }
    },
    creationDate: '05-06-2019',
    tag: 'Article'
  },
  {
    img: 'https://images.unsplash.com/photo-1560070094-e1f2ddec4337?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    en: {
      title: 'News of the day - whale in the ocean'
    },
    ru: {
      title: 'Новость дня - кит в океане!'
    },
    author: {
      en: {
        name: 'Vanish',
        surname: 'Max'
      },
      ru: {
        name: 'Vanish',
        surname: 'Max'
      }
    },
    creationDate: '05-06-2019',
    tag: 'Article'
  },
  {
    img: 'https://images.unsplash.com/photo-1559549200-4cae6f9d5535?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
    en: {
      title: 'News of the day - whale in the ocean'
    },
    ru: {
      title: 'Новость дня - кит в океане!'
    },
    author: {
      en: {
        name: 'Vanish',
        surname: 'Max'
      },
      ru: {
        name: 'Vanish',
        surname: 'Max'
      }
    },
    creationDate: '05-06-2019',
    tag: 'Article'
  }
]

export default () => {
  const lang = useContext(LangContext)
  return (
    <Layout title={Lang.metatitle[lang]} description={Lang.description[lang]} keywords={Lang.keywords[lang]}>
      <div className="app flex justify-between">
        <NewsGrid data={data} lang={'en'} />
      </div>
    </Layout>
  )
}
