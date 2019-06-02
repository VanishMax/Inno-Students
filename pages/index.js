import React from 'react'
import Head from 'next/head'
import Counter from '../components/counter'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title>Media Club</title>
          <meta name="description" content="MWA is a progressive solution to build awesome web applications"/>
        </Head>
        <div className="w-full">
          <h1 className="title">Redux Counter</h1>
          <div className="w-3/4 md:w-1/2 lg:w-1/4 my-8 mx-auto">
            <div className="rounded shadow-lg text-lg p-4">
              <Counter/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
