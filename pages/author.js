import React, {useContext} from 'react'
import Head from 'next/head'
import {LangContext} from '../middleware/context'
import Lang from '../langs/author'

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

      </div>
    </div>
  )
}
