import React from 'react'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import Receipt from '@material-ui/icons/Receipt'
import DirectionsRun from '@material-ui/icons/DirectionsRun'
import Mood from '@material-ui/icons/Mood'
import Domain from '@material-ui/icons/Domain'
import ChromeReaderMode from '@material-ui/icons/ChromeReaderMode'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '&/redux/actions'

import EditAfter from './EditAfter'
import MyDialog from './MyDialog'

const styles = {
  elemLeft: {
    position: 'absolute',
    top: '20%',
    left: '15%',
    width: '30%',
    minHeight: '10%',
    padding: '2%'
  },
  elemRight: {
    position: 'absolute',
    top: '20%',
    left: '55%',
    width: '30%',
    minHeight: '5%',
    padding: '2%'
  },
  buttonBase: {
    width: '100%',
    height: '100%'
  }
}

class Menu extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      create: false,
      edit: false,
      title: '',
      select: 'News',
      error: false,
      created: false
    }
    this.changeTitle = this.changeTitle.bind(this)
    this.editToggle = this.editToggle.bind(this)
    this.createToggle = this.createToggle.bind(this)
    this.changeSelects = this.changeSelects.bind(this)
    this.dialogClose = this.dialogClose.bind(this)
    this.createNews = this.createNews.bind(this)
  }
  createToggle(){
    this.setState({create: !this.state.create})
  }
  editToggle(){
    this.setState({edit: !this.state.edit})
  }
  dialogClose(){
    this.setState({created: false})
  }
  changeTitle(event){
    this.setState({title: event.target.value})
    if(event.target.value == ''){
      this.setState({error: true})
    }else{
      this.setState({error: false})
    }
  }
  changeSelects(event){
    this.setState({select: event.target.value})
  }
  createNews(){
    if(this.state.title != ''){
      this.props.actions.createNews(this.state.title, this.state.select)
      this.setState({create: false, created: true})
    }
  }
  render(){
    const {create, edit, title, select, error, created} = this.state

    return(
      <React.Fragment>


        <Paper elevation={3} style={styles.elemLeft} align="center">
          {edit ?
            <Fade in={edit}>
              <EditAfter editToggle={this.editToggle} styles={styles}/>
            </Fade>
            :
            <Fade in={true}>
              <ButtonBase style={styles.buttonBase} onClick={this.createToggle}>
                <Typography variant="h3">
                  Create
                </Typography>
              </ButtonBase>
            </Fade>
          }
        </Paper>

        <Paper elevation={3} style={styles.elemRight} align="center">
          {create ?
            <Fade in={create}>
              <div style={styles.buttonBase}>
                <Typography variant="h6">
                  Please, type the title of the news.
                </Typography>
                <Typography variant="subtitle1">
                  You will be able to change it later.
                </Typography>
                <form noValidate autoComplete="off">
                  <TextField id="newsTitle" label="Title" fullWidth value={this.state.title} error={error}
                             placeholder="Bears attacked" onChange={this.changeTitle} margin="normal"
                  />
                  <br/><br/>
                  <Select autoWidth={false} style={{ width: '60%' }} name="Category"
                          value={select}
                          onChange={this.changeSelects}
                          input={<Input name="Category"/>}
                  >
                    <MenuItem value="News"><Receipt/>News</MenuItem>
                    <MenuItem value="Article"><ChromeReaderMode/>Article</MenuItem>
                    <MenuItem value="Funny"><Mood/>Funny</MenuItem>
                    <MenuItem value="Sport"><DirectionsRun/>Sports</MenuItem>
                    <MenuItem value="Students life"><Domain/>Student's life</MenuItem>
                  </Select>
                </form>
                <br/><br/>
                <Button variant="contained" onClick={this.createToggle} style={{ marginRight: 20 }}>
                  Go back
                </Button>
                <Button variant="contained" color="primary" onClick={this.createNews}>
                  Create
                </Button>
              </div>
            </Fade>
            :
            <Fade in={true}>
              <ButtonBase style={styles.buttonBase} onClick={this.editToggle}>
                <Typography variant="h3">
                  Edit
                </Typography>
              </ButtonBase>
            </Fade>
          }
        </Paper>

        <MyDialog created={created} dialogClose={this.dialogClose} title={title}/>

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  news: state.news
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
