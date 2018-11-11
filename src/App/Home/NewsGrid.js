import React from 'react'
import { Helmet } from 'react-helmet'
import {connect} from 'react-redux'

import Grid from '@material-ui/core/Grid'
import NeewCard from '../News/Preview'

class NewsGrid extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    const {lang, news} = this.props
    return (
      <React.Fragment>
        <div style={{marginTop: 90}}>
          {news.map( (neew) =>
            <NeewCard key={neew._id} neew={neew} lang={lang}/>
          )}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  news: state.news,
  state: state
})
export default connect(mapStateToProps, null)(NewsGrid)