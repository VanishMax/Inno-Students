import React from 'react'

import '../static/css/index.css'
import '../static/css/normalize.css'
import '../static/css/default.css'
import '../static/css/headfoot.css'
import '../static/css/news.css'

import App, { Container } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import withStore from '../redux/withStore'
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
          <link rel="alternate" hrefLang={this.props.lang !== 'ru' ? 'ru': 'en'}
                href={baseDomain + this.props.path + (this.props.lang !== 'ru' ? '?lang=ru' : '') }/>
          <link rel="shortcut icon" href="/static/images/favicon.ico" type="image/x-icon"/>
          <link rel="icon" href="/static/images/favicon.ico" type="image/x-icon"/>
          <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"/>
          <meta name="copyright" content="Inno Media Club"/>
        </Head>
        <LangContext.Provider value={this.state.lang}>
          <AuthContext.Provider value={this.state.user}>
            <div className="wrap">
              <Header changeLang={this.toggleLang}/>
              <div className="pb-32 mt-4 clearfix">
                <Provider store={reduxStore}>
                  <Component {...pageProps} />
                </Provider>
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
export default withStore(flowRight([withUser, withLang])(MyApp))
