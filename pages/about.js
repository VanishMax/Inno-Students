import React, {useContext} from 'react'
import Layout from '../layouts/default'
import {LangContext} from '../middleware/context'
import Lang from '../langs/about'

export default () => {
  const lang = useContext(LangContext)
  return (
    <Layout title={Lang.metatitle[lang]} description={Lang.description[lang]} keywords={Lang.keywords[lang]}>
      <div className="w-full">
        <div className="max-w-lg rounded overflow-hidden shadow-lg my-8 mx-auto">
          <img className="w-full" src="static/images/square.png" alt="Sunset in the mountains"/>
          <div className="px-6 py-6">
            <div className="font-bold text-xl mb-2">{Lang.title[lang]}</div>
            <p className="text-gray-700 text-base text-justify">
              {Lang.text[lang]}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
