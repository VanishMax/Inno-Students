import React from 'react'
import {Helmet} from "react-helmet"
import Loadable from "react-loadable"
import Typography from '@material-ui/core/Typography'
import Paper from "@material-ui/core/Paper/Paper"
import Divider from "@material-ui/core/Divider"
import TextField from "@material-ui/core/TextField/TextField"
import axios from 'axios'

const styles = {
  paperMain: {
    width: '50%',
    margin: '5% auto 0',
    padding: 20
  },
  paper: {
    width: '50%',
    margin: '2% auto 0',
    padding: 20
  },
  linkInput: {
    width: '60%'
  }
}
const formats = [
  'header', 'bold', 'italic', 'underline',
  'blockquote', 'list', 'align',
  'link'
]
const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 'blockquote'],
    [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
    ['link'],
    ['clean']
    ],
}

export default class Content extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      id: null,
      loaded: false,
      html: ``,
      htmlRu: ``,
      photosLink: '',
      published: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeRu = this.handleChangeRu.bind(this)
    this.typePhotosLink = this.typePhotosLink.bind(this)
    this.changePhotosLink = this.changePhotosLink.bind(this)
    this.changeHTML = this.changeHTML.bind(this)
    this.changeHTMLRu = this.changeHTMLRu.bind(this)
    if (document) {
      this.quill = Loadable({
        loader: () => import(/* webpackChunkName: "ReactQuill" */ 'react-quill'),
        loading: () => null
      })
    }
  }
  componentDidMount(){
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
  handleChange(value){
    this.setState({ html: value })
  }
  handleChangeRu(value){
    this.setState({ htmlRu: value })
  }
  typePhotosLink(event){
    this.setState({photosLink: event.target.value})
  }
  changePhotosLink(event){
    axios.post('/admins/edit/photosLink', {id: this.state.id, photosLink: event.target.value})
  }
  changeHTML(value){
    if(value === null){
      axios.post('/admins/edit/content', {id: this.state.id, content: this.state.html})
    }
  }
  changeHTMLRu(value){
    if(value === null){
      axios.post('/admins/edit/contentRu', {id: this.state.id, content: this.state.htmlRu})
    }
  }
  render(){
    const Quill = this.quill
    let quill = <div/>
    let quillRu = <div/>
    if(Quill){
      quill = <Quill value={this.state.html || ''} formats={formats} onChangeSelection={this.changeHTML}
                     modules={modules} onChange={this.handleChange}/>
      quillRu = <Quill value={this.state.htmlRu || ''} formats={formats} onChangeSelection={this.changeHTMLRu}
                     modules={modules} onChange={this.handleChangeRu}/>
    }
    return(
      <div align="center">
        <Helmet>
          <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"/>
        </Helmet>

        <Paper elevation={3} style={styles.paperMain}>
          <Typography variant="h5">
            Content
          </Typography>
          <Typography variant="body1">
            To be sure that everything is saved, after writing content tap anywhere but <u>not buttons</u>
          </Typography>
          {this.state.published &&
          <Typography variant="body1" color="error">
            The news is published. All the changes will be immediately published.
          </Typography>}
          <br/>{quill}
          <TextField id="photosLink" label="Link to Google Photos album" value={this.state.photosLink}
                     style={styles.linkInput} margin="normal" onBlur={this.changePhotosLink}
                     placeholder="https://photos.app.goo.gl/DDEq5dtL3BEzz3pG9" onChange={this.typePhotosLink} />
        </Paper>

        <Paper elevation={3} style={styles.paper}>
          <Typography variant="h5">
            Контент на русском
          </Typography>

          <br/>{quillRu}<br/>
        </Paper>
        {this.props.children}
      </div>
    )
  }
}