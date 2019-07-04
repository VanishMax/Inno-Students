import React, {useContext} from 'react'
import withNews from '../middleware/HOCs/withNews'

import Lang from '../langs/tag'
import NewsGrid from '../components/news/grid'
import Layout from '../layouts/default'
import {LangContext} from '../middleware/context'
import tags from '../constants/tags'

const Tag = ({posts, slug}) => {
  const lang = useContext(LangContext)
  const tag = tags.find(x => x.url === slug)

  return (
    <Layout title={tag.title[lang]} description={tag.description[lang]} keywords={Lang.keywords[lang]}>
      <h2 className="app pb-4 text-lg font-light tracking-wide text-gray-600">{tag.description[lang]}</h2>
      <div className="app flex justify-between">
        <NewsGrid posts={posts} lang={lang} />
      </div>
    </Layout>
  )
}

export default withNews(Tag)
