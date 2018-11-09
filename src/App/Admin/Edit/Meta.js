import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper/Paper'
import axios from 'axios'
import TextField from '@material-ui/core/TextField/TextField'
import Divider from "@material-ui/core/Divider/Divider";

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
  input: {
    width: '60%'
  },
  pre: {
    width: '90%',
    margin: 'auto',
    textAlign: 'justify',
    backgroundColor: '#223',
    color: '#AAA',
    overflowX: "auto"
  }
}

export default class Meta extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      id: null,
      title: '',
      published: false,
      keywords: '',
      keywordsRu: '',
      authorName: '',
      authorNameRu: '',
      authorLink: '',
      neew: null,
      time: ''
    }
    this.typeAuthorName = this.typeAuthorName.bind(this)
    this.typeAuthorNameRu = this.typeAuthorNameRu.bind(this)
    this.typeAuthorLink = this.typeAuthorLink.bind(this)
    this.typeKeywords = this.typeKeywords.bind(this)
    this.typeKeywordsRu = this.typeKeywordsRu.bind(this)
    this.changeAuthorName = this.changeAuthorName.bind(this)
    this.changeAuthorNameRu = this.changeAuthorNameRu.bind(this)
    this.changeAuthorLink = this.changeAuthorLink.bind(this)
    this.changeKeywords = this.changeKeywords.bind(this)
    this.changeKeywordsRu = this.changeKeywordsRu.bind(this)
  }
  componentDidMount(){
    let url = window.location.pathname.split('/').pop()
    let id = url.split('-')[0]
    axios.post('/admins/getOneNews', {id: id})
      .then((response) => {
        let neew = response.data
        this.setState({
          id: id,
          title: neew.en.title,
          keywords: neew.en.keywords || '',
          keywordsRu: neew.ru.keywords || '',
          authorName: neew.en.authorName || '',
          authorNameRu: neew.ru.authorName || '',
          authorLink: neew.authorLink || '',
          neew: neew,
          published: neew.published,
          time: (neew.publishDate || '') + ', ' + (neew.publishTime || '')
        })
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  typeAuthorName(event){
    this.setState({authorName : event.target.value })
  }
  typeAuthorNameRu(event){
    this.setState({authorNameRu : event.target.value })
  }
  typeAuthorLink(event){
    this.setState({authorLink : event.target.value })
  }
  typeKeywords(event){
    this.setState({keywords : event.target.value })
  }
  typeKeywordsRu(event){
    this.setState({keywordsRu : event.target.value })
  }
  changeAuthorName(event){
    axios.post('/admins/edit/authorName', {id: this.state.id, authorName: this.state.authorName})
  }
  changeAuthorNameRu(event){
    axios.post('/admins/edit/authorNameRu', {id: this.state.id, authorNameRu: this.state.authorNameRu})
  }
  changeAuthorLink(event){
    axios.post('/admins/edit/authorLink', {id: this.state.id, authorLink: this.state.authorLink})
  }
  changeKeywords(event){
    axios.post('/admins/edit/keywords', {id: this.state.id, keywords: this.state.keywords})
  }
  changeKeywordsRu(event){
    axios.post('/admins/edit/keywordsRu', {id: this.state.id, keywordsRu: this.state.keywordsRu})
  }
  render(){
    const {title, authorName, authorNameRu, keywordsRu, authorLink,
          keywords, description, neew, time, published} = this.state
    let timePrint = null
    if(time != '' && time != ', ') timePrint = time
    return(
      <div align="center">
        <Paper elevation={3} style={styles.paperMain}>
          <Typography variant="h5">
            Meta
          </Typography>

          {published &&
          <Typography variant="body1" color="error">
            The news is published. All the changes will be immediately published.
          </Typography>}


          <TextField id="author_name" label="Name of the autor" value={authorName}
                     style={styles.input} margin="normal" onBlur={this.changeAuthorName}
                     placeholder="John Doue" onChange={this.typeAuthorName} />
          <TextField id="author_link" label="Any social media of the author" value={authorLink}
                     style={styles.input} margin="normal" onBlur={this.changeAuthorLink}
                     placeholder="https://vk.com/john_doeu" onChange={this.typeAuthorLink} />
          <TextField id="keywords" label="Keywords, using coma between them" value={keywords}
                     style={styles.input} margin="normal" onBlur={this.changeKeywords}
                     placeholder="Bears, Bears attacked, Bears attacked at night, shock" onChange={this.typeKeywords} />
          <br/>
        </Paper>
        <Paper elevation={3} style={styles.paper}>
          <Typography variant="h5">
            Meta По-русски
          </Typography>

          <TextField id="author_name_ru" label="Имя автора" value={authorNameRu}
                     style={styles.input} margin="normal" onBlur={this.changeAuthorNameRu}
                     placeholder="Вася Пупкин" onChange={this.typeAuthorNameRu} />
          <TextField id="keywords" label="Ключевые слов, разделенные запятой" value={keywordsRu}
                     style={styles.input} margin="normal" onBlur={this.changeKeywordsRu}
                     placeholder="Медиа, Медиа клуб, наш любимый ИнноУник" onChange={this.typeKeywordsRu} />
          <br/>
        </Paper>

        <Paper elevation={3} style={styles.paper}>
          <Typography variant="h6">How your {`<Head>`} will look like:</Typography>
          {neew !== null &&
          <pre style={styles.pre}>
              {
`<Helmet>
    <title>${neew.en.title || ''}</title>
    <meta name="keywords" content="${neew.en.keywords || ''}"/>
    <meta name="description" content="${neew.en.description || ''}"/>
    <meta name="copyright" content="Inno Media Club"/>
    <meta name="author" content="${(neew.en.authorName || '') + ', ' + (neew.authorLink || '')}"/>

    <meta name="og:title" content="${neew.en.title || ''}"/>
    <meta name="og:url" content="${neew.url || ''}"/>
    <meta name="og:image" content="/assets/pics${neew.previewImage || ''}"/>
    <meta name="og:description" content="${neew.en.description || ''}"/>
    <meta name="og:type" content="article"/>
    <meta property="article:author" content="${neew.authorLink || ''}"/>
    <meta property="article:publishedTime" content="${timePrint || ''}"/>
</Helmet>`}
            </pre>
          }
        </Paper>

        {this.props.children}

      </div>
    )
  }
}