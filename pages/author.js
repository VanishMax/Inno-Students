import React, {useContext} from 'react'
import Layout from '../layouts/default'
import {LangContext} from '../middleware/context'
import Lang from '../langs/author'

export default () => {
  const lang = useContext(LangContext)

  return (
    <Layout title={Lang.metatitle[lang]} description={Lang.description[lang]} keywords={Lang.keywords[lang]}>
      <h1>Well, hi! It an Author page</h1>
    </Layout>
  )
}
