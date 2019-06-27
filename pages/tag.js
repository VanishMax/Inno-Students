import React, {useContext} from 'react'
import withNews from '../middleware/HOCs/withNews'

import Lang from '../langs/tag'
import NewsGrid from '../components/news/grid'
import Layout from '../layouts/default'
import {LangContext} from '../middleware/context'

const Tag = ({posts}) => {
  const lang = useContext(LangContext)

  return (
    <Layout title={Lang.metatitle[lang]} description={Lang.description[lang]} keywords={Lang.keywords[lang]}>
      <div className="app flex justify-between">
        <NewsGrid posts={posts} lang={lang} />
      </div>
    </Layout>
  )
}

export default withNews(Tag)
