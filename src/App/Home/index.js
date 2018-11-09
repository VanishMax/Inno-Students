import React from 'react'
import Header from '../Header'
import { Helmet } from 'react-helmet'
import config from '#/home' //See /babelrc file to understand what is #
import NeewCard from '../News/Preview'
import {connect} from 'react-redux'

const neew = {
  ru: {
    title: "Рузкий"
  },
  en:{
    title: "Engly"
  }
}
class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    const {lang, news} = this.props
    return (
      <div>
        <Helmet>
          <title>{config.header[lang]}</title>
          <meta name="description" content="VaMax app" />
        </Helmet>
        <Header lang={lang} title={config.header[lang]}/>
        <div style={{marginTop: 90}}>
          {news.map( (neew) =>
            <NeewCard key={neew._id} neew={neew} lang={lang}/>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  news: state.news,
  state: state
})
export default connect(mapStateToProps, null)(Home)