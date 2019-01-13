import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper/Paper'
import axios from 'axios'
import { Helmet } from 'react-helmet'

import NoSsr from '@material-ui/core/NoSsr'
import { Editor, createEditorState, ImageSideButton, BreakSideButton } from 'medium-draft'
import { convertToRaw } from 'draft-js'
import Button from '@material-ui/core/Button'

const styles = {
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
      content: createEditorState(),
      contentRu: createEditorState(),
      photosLink: '',
      published: false
    }
    this.changeDraft = this.changeDraft.bind(this)
    this.changeDraftRu = this.changeDraftRu.bind(this)
    this.saveDraft = this.saveDraft.bind(this)
    this.saveDraftRu = this.saveDraftRu.bind(this)
  }
  componentDidMount() {
    let url = window.location.pathname.split('/').pop()
    let id = url.split('-')[0]
    axios.post('/admins/getOneNews', {id: id})
      .then((response) => {
        let neew = response.data
        this.setState({
          id: id,
          content: createEditorState(neew.en.content),
          contentRu: createEditorState(neew.ru.content),
          photosLink: neew.photosLink,
          published: neew.published
        })
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  changeDraft(content) { this.setState({ content: content }) }
  changeDraftRu(content) { this.setState({ contentRu: content }) }
  saveDraft(){
    const content = convertToRaw(this.state.content.getCurrentContent());
    axios.post('/admins/edit/content', { id: this.state.id, content: content })
    alert('Saved')
  }
  saveDraftRu(){
    const content = convertToRaw(this.state.contentRu.getCurrentContent());
    axios.post('/admins/edit/contentRu', { id: this.state.id, content: content })
    alert('Сохранено')
  }
  render(){
    return(
      <div align="center">
        <Helmet>
          <link rel="stylesheet" type="text/css" href="https://unpkg.com/medium-draft/dist/medium-draft.css"/>
        </Helmet>
          <Typography variant="h5" style={{ marginTop: 15 }}>
            Content
          </Typography>
          <Button variant="contained" color="primary"
                  onClick={this.saveDraft} style={{ margin: '10px 0 0' }}>
            Save
          </Button>
          {this.state.published &&
            <Typography variant="body1" color="error">
              The news is published. All the changes will be immediately published.
            </Typography>
          }

        <Paper elevation={3} style={styles.paper}>
          <NoSsr>
            <Editor
              sideButtons={[{ title: 'Image', component: ImageSideButton }, { title: 'Break', component: BreakSideButton }]}
              editorState={this.state.content}
              onChange={this.changeDraft} />
          </NoSsr>
        </Paper>

        <Typography variant="h5" style={{ marginTop: 15 }}>
          Контент на русском
        </Typography>
        <Button variant="contained" color="primary"
                onClick={this.saveDraftRu} style={{ margin: '10px 0 0' }}>
          Сохранить
        </Button>
        <Paper elevation={3} style={styles.paper}>
          <NoSsr>
            <Editor
              sideButtons={[{ title: 'Image', component: ImageSideButton }, { title: 'Break', component: BreakSideButton }]}
              editorState={this.state.contentRu}
              onChange={this.changeDraftRu} />
          </NoSsr>
        </Paper>

        {this.props.children}
      </div>
    )
  }
}
