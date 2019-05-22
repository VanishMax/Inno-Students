import React from 'react'
import Head from 'next/head'

export default () => (
  <div>
    <Head>
      <title>About MWA</title>
      <meta name="description" content="About the MWA"/>
    </Head>
    <div className="w-full">
      <h1 className="title font-comforta">About MWA</h1>
      <div className="max-w-lg rounded overflow-hidden shadow-lg my-8 mx-auto">
        <img className="w-full" src="/static/square.png" alt="Sunset in the mountains"/>
        <div className="px-6 py-6">
          <div className="font-bold text-xl mb-2">Modern Web App</div>
          <p className="text-gray-700 text-base text-justify">
            Modern Web App (MWA) is an application following all the modern standards in web development.
            One of them is the Progressive Web App which gives us the ability to download a mobile browser
            version to your smart phone and use it as a standalone mobile application, the ability to browse
            website offline. It has a perfect Search Engine Optimisation (SEO), user accessibility
            and, of course, high performance.
          </p>
        </div>
      </div>
    </div>
  </div>
)
