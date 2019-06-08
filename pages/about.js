import React, {useContext} from 'react'
import Head from 'next/head'
import {LangContext} from '../middleware/context'
import Lang from '../langs/about'

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
    </div>
  )
}
