import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper/Paper'
import axios from 'axios'
import { Helmet } from 'react-helmet'

import NoSsr from '@material-ui/core/NoSsr'
import { Editor, createEditorState, ImageSideButton, BreakSideButton } from 'medium-draft'

const styles = {
  paperMain: {
    width: '70%',
    margin: '5% auto 0',
    padding: 20
  },
  paper: {
    width: '70%',
    margin: '2% auto 0',
    padding: 20
  },
  linkInput: {
    width: '60%'
  }
}

export default class Content extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      loaded: false,
      html: ``,
      htmlRu: ``,
      photosLink: '',
      published: false,
      editorState: createEditorState()
    }
    this.changeDraft = this.changeDraft.bind(this)
  }
  componentDidMount() {
    let url = window.location.pathname.split('/').pop()
    let id = url.split('-')[0]
    axios.post('/admins/getOneNews', {id: id})
      .then((response) => {
        let neew = response.data
        this.setState({
          id: id,
          html: neew.en.content,
          htmlRu: neew.ru.content,
          photosLink: neew.photosLink,
          published: neew.published
        })
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  changeDraft(editorState){ this.setState({ editorState: editorState }) }
  saveDraft(){
    const content = editorStateToJSON(this.state.editorState);
    console.log(content);
  }
  render(){
    return(
      <div align="center">
        <Helmet>
          <link rel="stylesheet" type="text/css" href="https://unpkg.com/medium-draft/dist/medium-draft.css"/>
        </Helmet>
        <Paper elevation={3} style={styles.paperMain}>
          <Typography variant="h5">
            Content
          </Typography>
          {this.state.published &&
            <Typography variant="body1" color="error">
              The news is published. All the changes will be immediately published.
            </Typography>
          }

          <NoSsr>
            <Editor
              sideButtons={[{ title: 'Image', component: ImageSideButton }, { title: 'Break', component: BreakSideButton }]}
              editorState={this.state.editorState}
              onChange={this.changeDraft} />
          </NoSsr>

        </Paper>

        <Paper elevation={3} style={styles.paper}>
          <Typography variant="h5">
            Контент на русском
          </Typography>
        </Paper>
        {this.props.children}
      </div>
    )
  }
}
