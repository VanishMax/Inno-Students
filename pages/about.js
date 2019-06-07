import React from 'react'
import Head from 'next/head'

export default () => (
  <div>
    <Head>
      <title>About | InnoStudents</title>
      <meta name="description" content="About the Innostudents Media club"/>
    </Head>
    <div className="w-full">
      <div className="max-w-lg rounded overflow-hidden shadow-lg my-8 mx-auto">
        <img className="w-full" src="/static/images/square.png" alt="Sunset in the mountains"/>
        <div className="px-6 py-6">
          <div className="font-bold text-xl mb-2">InnoStudents</div>
          <p className="text-gray-700 text-base text-justify">
            InnoStudents Media Club is the Innopolis University's student club that
            provides the information about the University for students and for
            interested people outside Innopolis.
          </p>
        </div>
      </div>
    </div>
  </div>
)
