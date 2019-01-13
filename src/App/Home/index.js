import React from 'react'
import { Helmet } from 'react-helmet'

import Header from '../Header'
import config from '#/home' //See /babelrc file to understand what is #

import LoadableHOC from '&/HOCs/LoadableHOC'
const NewsGrid = LoadableHOC({ loader: () => import(/* webpackChunkName: "NewsGrid" */ './NewsGrid') })

export default class Home extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    const {lang} = this.props
    return (
      <div>
        <Helmet>
          <title>{config.header[lang]}</title>
          <meta name="description" content="VaMax app" />
        </Helmet>
        <Header lang={lang} title={config.header[lang]}/>
        <NewsGrid lang={lang}/>
      </div>
    )
  }
}
