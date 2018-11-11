import React from 'react'
import { Helmet } from 'react-helmet'
import {connect} from 'react-redux'

import Grid from '@material-ui/core/Grid'
import NeewCard from '../News/Preview'

const styles = {
  grid: {
    float: 'left',
    minWidth: '48%',
    width: '48%'
  },
  grid0: {
    marginRight: 'calc(100% - 96%)',
    float: 'left',
    minWidth: '48%',
    width: '48%'
  },
  item: {
    width: '100%',
    marginTop: 20
  },
  div: {
    width: '80%',
    margin: 'auto'
  }
}

class NewsGrid extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    const {lang, news} = this.props
    let grid0 = []
    let grid1 = []
    for(let i = 0; i < news.length; i++){
      if(i % 2 == 1){
        grid1.push(<Grid key={news[i]['_id']} item style={styles.item}><NeewCard neew={news[i]} lang={lang}/></Grid>)
      }else{
        grid0.push(<Grid key={news[i]['_id']} item style={styles.item}><NeewCard neew={news[i]} lang={lang}/></Grid>)
      }
    }
    return (
      <div align='center' style={styles.div}>
        <Grid container justify='flex-start' alignItems='center'
              direction='column' style={styles.grid0}>
          {grid0}
        </Grid>
        <Grid container justify='flex-start' alignItems='center'
              direction='column' style={styles.grid}>
          {grid1}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  news: state.news,
  state: state
})
export default connect(mapStateToProps, null)(NewsGrid)