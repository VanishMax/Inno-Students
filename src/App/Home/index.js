import React from 'react'
import Header from '../Header'
import { Helmet } from 'react-helmet'
import config from '#/home' //See /babelrc file to understand what is #
import NeewCard from '../News/Preview'

const neew = {
  ru: {
    title: "Рузкий"
  },
  en:{
    title: "Engly"
  }
}
export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
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
        <div style={{marginTop: 90}}>
          <NeewCard neew={neew} lang={lang}/>
        </div>
      </div>
    )
  }
}