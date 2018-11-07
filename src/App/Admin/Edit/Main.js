import React from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import Input from "@material-ui/core/Input/Input"
import Button from '@material-ui/core/Button'
import Paper from "@material-ui/core/Paper"
import MenuItem from "@material-ui/core/MenuItem/MenuItem"
import Select from "@material-ui/core/Select/Select"
import Receipt from '@material-ui/icons/Receipt'
import DirectionsRun from '@material-ui/icons/DirectionsRun'
import Mood from '@material-ui/icons/Mood'
import Domain from '@material-ui/icons/Domain'

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
    width: "60%"
  },
  file: {
    display: 'none'
  }
}

export default class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      id: 0,
      url: '',
      published: false,
      news: null,
      newsLoaded: false,
      inputTitle: '',
      inputTitleRu: '',
      errorTitle: false,
      errorTitleRu: false,
      inputCategory: 'News',
      inputLead: '',
      inputLeadRu: '',
      errorLead: false,
      errorLeadRu: false,
      inputFile: '',
      src: ''
    }
    this.changeTitle = this.changeTitle.bind(this)
    this.changeTitleRu = this.changeTitleRu.bind(this)
    this.changeSelects = this.changeSelects.bind(this)
    this.changeLead = this.changeLead.bind(this)
    this.changeLeadRu = this.changeLeadRu.bind(this)
    this.changeFile = this.changeFile.bind(this)
    this.titleFocusout = this.titleFocusout.bind(this)
    this.titleRuFocusout = this.titleRuFocusout.bind(this)
    this.leadFocusout = this.leadFocusout.bind(this)
    this.leadRuFocusout = this.leadRuFocusout.bind(this)
    this.submitFile = this.submitFile.bind(this)
  }
  componentDidMount(){
    let url = window.location.pathname.split('/').pop()
    let id = url.split('-')[0]
    axios.post('/admins/getOneNews', {id: id})
      .then((response) => {
        let neew = response.data
        this.setState({
          id: id,
          url: url,
          published: neew.published,
          newsLoaded: true,
          inputFile: neew.previewImage,
          inputCategory: neew.category,
          inputTitle: neew.en.title,
          inputTitleRu: neew.ru.title,
          inputLead: neew.en.lead,
          inputLeadRu: neew.ru.lead
        })
        if(neew.previewImage !== '') this.setState({src: '/assets/pics/' + neew.previewImage})
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  changeTitle(event){
    this.setState({inputTitle: event.target.value})
    if(event.target.value == ''){
      this.setState({errorTitle: true})
    }else{
      this.setState({errorTitle: false})
    }
  }
  changeTitleRu(event){
    this.setState({inputTitleRu: event.target.value})
    if(event.target.value == ''){
      this.setState({errorTitleRu: true})
    }else{
      this.setState({errorTitleRu: false})
    }
  }
  changeLead(event){
    this.setState({inputLead: event.target.value})
    if(event.target.value == ''){
      this.setState({errorLead: true})
    }else{
      this.setState({errorLead: false})
    }
  }
  changeLeadRu(event){
    this.setState({inputLeadRu: event.target.value})
    if(event.target.value == ''){
      this.setState({errorLeadRu: true})
    }else{
      this.setState({errorLeadRu: false})
    }
  }
  changeSelects(event){
    this.setState({inputCategory: event.target.value})
  }
  changeFile(event){
    if(window.FileReader){
      let file = event.target.files[0], reader = new FileReader(), self = this
      reader.onload = function(r){
        self.setState({
          src: r.target.result
        })
      }
      reader.readAsDataURL(file)
      self.setState({inputFile: file.name})
      this.submitFile(file, this.state.id)
    }
    else {
      alert(`Soryy, your browser doesn't support the preview`)
    }
  }
  submitFile(file){
    const url = '/admins/edit/file'
    const formData = new FormData()
    formData.append('file', file)
    formData.append('id', this.state.id)
    formData.append('url', this.state.url)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return axios.post(url, formData, config)
  }
  titleFocusout(event){
    axios.post('/admins/edit/title', {id: this.state.id, title: event.target.value})
      .then((response) => {
        if(response.data.url !== false){
          window.location.pathname = '/admins/edit/' + response.data.url
        }
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  titleRuFocusout(event){
    axios.post('/admins/edit/titleRu', {id: this.state.id, titleRu: event.target.value})
  }
  leadFocusout(event){
    axios.post('/admins/edit/lead', {id: this.state.id, lead: event.target.value})
  }
  leadRuFocusout(event){
    axios.post('/admins/edit/leadRu', {id: this.state.id, leadRu: event.target.value})
  }
  render(){
    const { inputTitle, inputTitleRu, errorTitle, errorTitleRu, inputLead, inputLeadRu,
      errorLead, errorLeadRu, inputCategory, inputFile, src, published } = this.state
    return(
      <div align="center">
        <Paper elevation={3} style={styles.paperMain}>
          <Typography variant="headline">
            Main
          </Typography>

          {published ?
            <Typography variant="body1" color="error">
              The news is published. All the changes will be immediately published.
            </Typography>
          :
            <Typography variant="subheading">
              All the data is automatically saved
            </Typography>}


            <TextField id="newsTitle" label="Title" value={inputTitle} error={errorTitle}
                       fullWidth onBlur={this.titleFocusout} margin="normal" required style={styles.input}
                       placeholder="Bears attacked" onChange={this.changeTitle} /><br/>

            <Select autoWidth={false} name="Category" value={inputCategory}
                    onChange={this.changeSelects} input={<Input name="Category"/>}>
              <MenuItem value="News"><Receipt/>News</MenuItem>
              <MenuItem value="Funny"><Mood/>Funny</MenuItem>
              <MenuItem value="Sport"><DirectionsRun/>Sports</MenuItem>
              <MenuItem value="Students life"><Domain/>Student's life</MenuItem>
            </Select><br/>

            <TextField id="newsLead" label="Lead" value={inputLead} error={errorLead} fullWidth
                       placeholder="Bears attacked citizens at 14th of July"
                       onChange={this.changeLead} margin="normal"
                       onBlur={this.leadFocusout} style={styles.input}/>

            <form noValidate autoComplete="off">
              <input accept="image/*" style={styles.file} onChange={this.changeFile}
                     id="button-file" type="file"/>

              <label htmlFor="button-file" style={styles.input}>
                <Button type="submit" variant="raised" color="primary" component="span">
                  {inputFile == '' ? 'Upload Preview picture' : inputFile}
                </Button>
              </label>
            </form>

            <br/>{src !== '' && <img src={src} width="200" height="160"/>}
        </Paper>

        <Paper elevation={3} style={styles.paper}>
          <TextField id="newsTitleRu" label="Название на русском" value={inputTitleRu} error={errorTitleRu}
                     fullWidth onBlur={this.titleRuFocusout} margin="normal" style={styles.input}
                     placeholder="Медведи на подходе" onChange={this.changeTitleRu} />
          <TextField id="newsLeadRu" label="Лид на русском" value={inputLeadRu} error={errorLeadRu}
                     fullWidth placeholder="Вы любите розы? А я на них..."
                     onChange={this.changeLeadRu} margin="normal" style={styles.input}
                     onBlur={this.leadRuFocusout}/>
        </Paper>

          {this.props.children}
      </div>
    )
  }
}