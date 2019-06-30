import React from 'react'

import '../static/css/index.css'
import '../static/css/normalize.css'
import '../static/css/default.css'
import '../static/css/post.css'
import '../static/css/headfoot.css'
import '../static/css/news.css'

import App, { Container } from 'next/app'
import Head from 'next/head'
import { LangContext, AuthContext } from '../middleware/context'
import Router from 'next/router'

// HOCs to inject user and language props to the application (from server)
import withLang from '../middleware/HOCs/withLang'
import withUser from '../middleware/HOCs/withUser'
import flowRight from 'lodash.flowright'

import Header from '../components/header'
import Footer from '../components/footer'

class MyApp extends App {
  constructor(props) {
    super(props)
    this.state = {
      lang: this.props.lang,
      user: this.props.user
    }

    // Change global language (URL also)
    this.toggleLang = () => {
      let lang = this.state.lang === 'en' ? 'ru' : 'en'
      document.cookie = `cookieLang=${lang}`
      if(Router.query.slug) {
        if(lang === 'ru') {
          Router.replace({
            pathname: Router.pathname,
            query: { slug: Router.query.slug, lang: 'ru' }},
            Router.asPath.match(/lang=ru/) ? '' : Router.asPath + '?lang=ru')
        } else {
          Router.replace({ pathname: Router.pathname, query: { slug: Router.query.slug }}, Router.pathname + '/' + Router.query.slug)
        }
      } else {
        if(lang === 'ru') {
          Router.replace({
            pathname: Router.pathname,
            query: { lang: 'ru' }},
            Router.asPath.match(/lang=ru/) ? '' : Router.asPath + '?lang=ru')
        } else {
          Router.replace({ pathname: Router.pathname})
        }
      }
      this.setState({lang: lang})
    }
  }

  render () {
    const { Component, pageProps } = this.props
    const baseDomain = 'https://inno-students.herokuapp.com'

    return (
      <Container>
        <Head>
          <meta name="theme-color" content="#75a261"/>
          <link rel="alternate" hrefLang={this.props.lang !== 'ru' ? 'ru': 'en'}
                href={baseDomain + this.props.path + (this.props.lang !== 'ru' ? '?lang=ru' : '') }/>
          <link rel="shortcut icon" href="/static/images/favicon.ico" type="image/x-icon"/>
          <link rel="icon" href="/static/images/favicon.ico" type="image/x-icon"/>
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700&display=swap" rel="stylesheet"/>
          <meta name="copyright" content="Inno Media Club"/>
        </Head>
        <LangContext.Provider value={this.state.lang}>
          <AuthContext.Provider value={this.state.user}>
            <div className="wrap">
              <Header changeLang={this.toggleLang}/>
              <div className="pb-32 mt-4 clearfix">
                <Component {...pageProps} />
              </div>
            </div>
            <Footer/>
          </AuthContext.Provider>
        </LangContext.Provider>
      </Container>
    )
  }
}

// Merging HOCs
export default flowRight([withUser, withLang])(MyApp)
