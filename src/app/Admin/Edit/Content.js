import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper/Paper'
import axios from 'axios'
import { Helmet } from 'react-helmet'

import NoSsr from '@material-ui/core/NoSsr'
import { convertToRaw, convertFromRaw } from 'draft-js'
import Button from '@material-ui/core/Button'

import Dante from 'Dante2'
import { ImageBlockConfig } from 'Dante2/package/lib/components/blocks/image.js'

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
      content: null,
      contentRu: null,
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
        if(neew.en.content) this.setState({ content: JSON.parse(neew.en.content) })
        if(neew.ru.content) this.setState({ contentRu: JSON.parse(neew.ru.content) })
        this.setState({
          id: id,
          url: url,
          photosLink: neew.photosLink,
          published: neew.published,
          loaded: true
        })
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  changeDraft(content) { this.setState({ content: content.emitSerializedOutput() }) }
  changeDraftRu(content) { this.setState({ contentRu: content.emitSerializedOutput() }) }
  saveDraft(){
    const content = JSON.stringify(this.state.content)
    axios.post('/admins/edit/content', { id: this.state.id, content: content })
    alert('Saved')
  }
  saveDraftRu(){
    const content = JSON.stringify(this.state.contentRu)
    axios.post('/admins/edit/contentRu', { id: this.state.id, content: content })
    alert('Сохранено')
  }
  render(){

    let dante
    let danteRu
    if(this.state.loaded){
      dante = <Dante onChange={this.changeDraft} content={this.state.content}
                     widgets={[ImageBlockConfig({ options: {
                           upload_url: '/admins/edit/contentPicture',
                           upload_callback: (ctx, img) => {
                             console.log(ctx)
                           } } })
                     ]}/>
      danteRu = <Dante onChange={this.changeDraftRu} content={this.state.contentRu}/>
    } else {
      dante = <React.Fragment/>
    }

    return(
      <div align="center">
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
          {dante}
        </Paper>

        <Typography variant="h5" style={{ marginTop: 15 }}>
          Контент на русском
        </Typography>
        <Button variant="contained" color="primary"
                onClick={this.saveDraftRu} style={{ margin: '10px 0 0' }}>
          Сохранить
        </Button>
        <Paper elevation={3} style={styles.paper}>
            {danteRu}
        </Paper>

        {this.props.children}
      </div>
    )
  }
}
