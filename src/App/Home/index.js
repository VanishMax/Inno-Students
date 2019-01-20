import React from 'react'
import { Helmet } from 'react-helmet'
import localization from '#/home' //See /babelrc file to understand what is #

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
          <title>{ localization.header[lang] }</title>
          <meta name="description" content="VaMax app" />
        </Helmet>
        <NewsGrid lang={ lang }/>
      </div>
    )
  }
}
