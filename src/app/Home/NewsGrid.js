import React from 'react'
import {connect} from 'react-redux'

import Grid from '@material-ui/core/Grid'
import NeewCard from '../News/NewsCard'
import PinnedNeew from '../News/Pinned'

const styles = {
  grid: {
    float: 'left',
    minWidth: '46%',
    width: '46%'
  },
  grid0: {
    marginRight: 'calc(100% - 92%)',
    float: 'left',
    minWidth: '46%',
    width: '46%'
  },
  item: {
    width: '100%',
    marginTop: 20
  },
  div: {
    width: '70%',
    margin: 'auto',
    paddingTop: 20
  },
  pinned: {
    margin: 'auto',
    width: '70%'
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
    if(news){
      for(let i = 0; i < news.length; i++){
        if(i % 2 === 1){
          grid1.push(<Grid key={news[i]['_id']} item style={styles.item}><NeewCard neew={news[i]} lang={lang}/></Grid>)
        }else{
          grid0.push(<Grid key={news[i]['_id']} item style={styles.item}><NeewCard neew={news[i]} lang={lang} starred={true}/></Grid>)
        }
      }
      return (
        <div align='center' style={styles.div}>
          <div style={styles.pinned}>
            <PinnedNeew neew={news[0]} lang={lang}/>
          </div><br/>
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
    } else {
      return <React.Fragment/>
    }
  }
}

const mapStateToProps = (state) => ({
  news: state.news,
  state: state
})
export default connect(mapStateToProps, null)(NewsGrid)
