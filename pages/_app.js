import React from 'react'

import '../styles/index.css'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import withStore from '../redux/withStore'

import { LangContext } from '../langs/langContext'
import cookies from 'next-cookies'
import Router from 'next/router'

import Header from '../components/header'
import Footer from '../components/footer'

class MyApp extends App {
  static async getInitialProps(ctx) {
    const { cookieLang } = cookies(ctx.ctx) || ''
    let lang = 'en'
    if((ctx.ctx.query && ctx.ctx.query.lang === 'ru') || cookieLang === 'ru') lang = 'ru'
    return {lang: lang}
  }

  constructor(props) {
    super(props)
    this.state = {
      lang: this.props.lang
    }

    this.toggleLang = () => {
      let lang = this.state.lang === 'en' ? 'ru' : 'en'
      document.cookie = `cookieLang=${lang}`
      this.setState({lang: lang})
      if(lang === 'ru') {
        Router.replace({ pathname: Router.pathname, query: { lang: 'ru' }, shallow: true})
      } else {
        Router.replace({ pathname: Router.pathname, shallow: true})
      }
    }
  }

  render () {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Container>
        <Head>
          <meta name="theme-color" content="#75a261"/>
          <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon"/>
          <link rel="icon" href="/static/favicon.ico" type="image/x-icon"/>
          <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"/>
          <meta name='keywords' content='MWA, Modern Web App, PWA, Progressive Web App, Next.js, Next, Tailwind, Redux, WebDev'/>
          <meta name='author' content='VanishMax'/>
        </Head>
        <LangContext.Provider value={this.state.lang}>
          <div className="wrap">
            <Header changeLang={this.toggleLang}/>
            <div className="main clearfix">
              <Provider store={reduxStore}>
                <Component {...pageProps} />
              </Provider>
            </div>
          </div>
          <Footer/>
        </LangContext.Provider>
      </Container>
    )
  }
}

export default withStore(MyApp)
