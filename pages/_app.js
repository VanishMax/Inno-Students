import React from 'react'

import '../styles/index.css'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import withStore from '../redux/withStore'

import Header from '../components/header'
import Footer from '../components/footer'

class MyApp extends App {
  render () {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Container>
        <Head>
          <meta name="theme-color" content="#616161"/>
          <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon"/>
          <link rel="icon" href="/static/favicon.ico" type="image/x-icon"/>
          <link href="https://fonts.googleapis.com/css?family=Comfortaa" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"/>
          <meta name='keywords' content='MWA, Modern Web App, PWA, Progressive Web App, Next.js, Next, Tailwind, Redux, WebDev'/>
          <meta name='author' content='VanishMax'/>
        </Head>
        <div className="wrap">
          <Header/>
          <div className="main clearfix">
            <Provider store={reduxStore}>
              <Component {...pageProps} />
            </Provider>
          </div>
        </div>
        <Footer/>
      </Container>
    )
  }
}

export default withStore(MyApp)
