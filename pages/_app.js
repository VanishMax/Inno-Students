import React from 'react'
import 'isomorphic-unfetch'

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
  static async getInitialProps({ ctx }) {
    const { cookieLang } = cookies(ctx) || ''
    let lang = 'en'
    if((ctx.query && ctx.query.lang === 'ru') || cookieLang === 'ru') lang = 'ru'

    if(cookieLang === 'ru' && (!ctx.query || ctx.query.lang !== 'ru')) {
      if (ctx.res) {
        ctx.res.writeHead(302, { Location: ctx.pathname + '?lang=ru' })
        ctx.res.end()
      } else {
        Router.replace({ pathname: Router.pathname, query: { lang: 'ru' }, shallow: true})
      }
    }

    if(ctx.req) {
      console.log('ctx', ctx.req.user)
    }
    // const baseUrl = ctx.req ? `${ctx.req.protocol}://${ctx.req.get('Host')}` : ''
    // const res = await fetch(baseUrl + '/user/isAdmin', {method: 'POST'})
    // const json = await res.json()
    // console.log(json)

    return {lang: lang, path: ctx.pathname}
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
    const baseDomain = 'https://inno-students.herokuapp.com'

    return (
      <Container>
        <Head>
          <meta name="theme-color" content="#75a261"/>
          <link rel="alternate" hrefLang="en" href={baseDomain + this.props.path + '?lang=' + this.props.lang }/>
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
