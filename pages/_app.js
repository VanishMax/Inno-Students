import React from 'react'

import '../styles/index.css'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import withStore from '../redux/withStore'

import Nav from '../components/nav'

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
          <meta name='keywords' content='MWA, Modern Web App, PWA, Progressive Web App, Next.js, Next, Tailwind, Redux, WebDev'/>
          <meta name='author' content='VanishMax'/>
        </Head>
        <Nav/>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withStore(MyApp)
