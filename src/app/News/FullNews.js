import React from 'react'
import {connect} from 'react-redux'
import { Helmet } from 'react-helmet'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Header from '../Header'
import { Editor, createEditorState } from 'medium-draft'

const styles = {
  paper: {
    width: '60%',
    margin: '20px auto 0'
  },
  img: {
    width: '80%',
    margin: 'auto'
  },
  content:{
    width: '75%',
    textAlign: 'justify'
  }
}

class News extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    let timePrint;
    let neew;
    let time;
    const { news } = this.props

    if (news === undefined) {
      return <Header title='Inno Media Club' lang={this.props.lang}/>
    } else {
      neew = news[this.props.lang]
      time = (news.publishDate || '') + ', ' + (news.publishTime || '')
      timePrint = null
      if (time !== '' && time !== ', ') {
        timePrint = time
      }

      return (
        <React.Fragment>
          <Helmet>
            <title>{neew.title || 'Какой-то заголовок'}</title>
            <meta name='keywords' content={neew.keywords || ''}/>
            <meta name='description' content={neew.description || ''}/>
            <meta name='copyright' content='Inno Media Club'/>
            <meta name='author' content={(neew.authorName || '') + ', ' + (news.authorLink || '')}/>

            <meta name='og:title' content={neew.title || ''}/>
            <meta name='og:url' content={news.url || ''}/>
            <meta name='og:image' content={'/assets/pics/' + (news.previewImage || '')}/>
            <meta name='og:description' content={neew.description || ''}/>
            <meta name='og:type' content="article"/>
            <meta property='article:author' content={news.authorLink || ''}/>
            <meta property='article:publishedTime' content={timePrint || ''}/>

            <link rel="stylesheet" type="text/css" href="https://unpkg.com/medium-draft/dist/medium-draft.css"/>
          </Helmet>
          <Header title='Inno Media Club' lang={this.props.lang}/>

          <Paper align='center' style={styles.paper} elevation={4}>
            <img style={styles.img} src={'/assets/pics/' + news.previewImage} alt={neew.title}/>
            <br/>
            <Typography variant='h5'>{neew.title}</Typography>
            <br/>
            <Editor editorState={createEditorState(neew.content)} editorEnabled={false}/>
          </Paper>

        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  news: state.neew,
  state: state
})
export default connect(mapStateToProps, null)(News)
