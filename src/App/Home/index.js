import React from 'react'
import { Helmet } from 'react-helmet'
import {connect} from 'react-redux'

import Header from '../Header'
import config from '#/home' //See /babelrc file to understand what is #
import Loadable from 'react-loadable'
import Loading from '&/Loading'

const NewsGrid = Loadable({
  loader: () => import(/* webpackChunkName: "NewsGrid" */ './NewsGrid'),
  loading: Loading,
  delay: 500,
})

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