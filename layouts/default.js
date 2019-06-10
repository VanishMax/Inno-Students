import React from 'react'
import Head from 'next/head'

export default ({ children, title, description, keywords }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title || ''} | InnoStudents</title>
        <meta name="description" content={description || ''}/>
        <meta name="keywords" content={keywords || ''}/>
        <meta name="og:image" content="static/images/square.png"/>
        <meta name="og:type" content="website"/>
      </Head>
      <div className="w-full">
        {children}
      </div>
    </React.Fragment>
  )
}
