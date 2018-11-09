import React from 'react'
import axios from "axios"

import Paper from '@material-ui/core/Paper/Paper'
import Typography from '@material-ui/core/Typography/Typography'
import Divider from '@material-ui/core/Divider'
import Button from "@material-ui/core/Button/Button"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions/DialogActions"
import Dialog from "@material-ui/core/Dialog/Dialog"

import NeewCard from '&/App/News/Preview'

const styles = {
  paper: {
    width: '50%',
    margin: '2% auto 0',
    padding: 20
  },
  pre: {
    width: '90%',
    margin: 'auto',
    textAlign: 'justify',
    backgroundColor: '#223',
    color: '#AAA'
  },
  card:{
    marginTop: '5%',
    maxWidth: '60%'
  },
  expandIcon:{
    marginRight: -8,
    marginLeft: 'auto'
  },
  expand:{
    transform: 'rotate(180deg)',
    transition: 'transform 200'
  },
  expand0:{
    transform: 'rotate(0deg)',
    transition: 'transform 200'
  }
}

export default class Preview extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      neew: null,
      toDelete: false,
      publishDialog: false,
      published: false,
      time: '',
      langEn: true
    }
    this.deleteNewsDialog = this.deleteNewsDialog.bind(this)
    this.changeLang = this.changeLang.bind(this)
    this.deleteForever = this.deleteForever.bind(this)
    this.publish = this.publish.bind(this)
    this.publishDialog = this.publishDialog.bind(this)
  }
  componentDidMount(){
    let url = window.location.pathname.split('/').pop()
    let id = url.split('-')[0]
    axios.post('/admins/getOneNews', {id: id})
      .then((response) => {
        this.setState({
          neew: response.data,
          published: response.data.published,
          time: (response.data.publishDate || '') + ', ' + (response.data.publishTime || '')
        })
        console.log(`length of content is ` + response.data.en.content.length)
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  changeLang(){
    this.setState({ langEn: !this.state.langEn})
  }
  handleExpandClick(){
    this.setState({ expanded: !this.state.expanded })
  }
  deleteNewsDialog(){
    this.setState({toDelete: !this.state.toDelete})
  }
  deleteForever(){
    axios.post('/admins/deleteNews', {id: this.state.neew._id})
    window.location.pathname = '/admins/'
  }
  publish(){
    axios.post('/admins/publishNews', {id: this.state.neew._id})
      .then((response) => {
        this.setState({
          time: response.data.time + " " + response.data.date,
          published: true,
          publishDialog: false
        })
      })
  }
  publishDialog(){
    this.setState({ publishDialog: !this.state.publishDialog })
  }
  render(){
    const {neew, toDelete, expanded, publishDialog, published, time, langEn} = this.state
    let timePrint = null
    if(time != '' && time != ', '){ timePrint = time}
    return(
      <div align="center">
        {published && <Typography variant="h5">The news is published</Typography>}
        <Button variant="raised" color="secondary" style={{marginRight: 20}} onClick={this.deleteNewsDialog}>
          Delete
        </Button>
        <Button variant="raised" color="primary" onClick={this.publishDialog} disabled={published}>
          Publish
        </Button>

        <Paper elevation={3} style={styles.paper}>
            <Typography variant="h5">
              Preview
            </Typography>
            <Typography variant="subtitle1">
              How your news will look like:
            </Typography>
            <Button variant="contained" color="primary" onClick={this.changeLang}>
              {langEn ? `Change Lang` : `Изменить язык`}
            </Button>
          <Divider/>

          {neew !== null &&
            <NeewCard lang={langEn ? 'en' : 'ru'} neew={neew} style={styles.card}/>
          }
        </Paper>


        <Dialog open={toDelete} onClose={this.deleteNewsDialog}>
          <DialogTitle>Are you sure you want to delete this news?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              The news {neew !== null && `"${neew.en.title}"`} will be deleted forever
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.deleteForever} color="primary" autoFocus>
              Delete
            </Button>
            <Button onClick={this.deleteNewsDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={publishDialog} onClose={this.publishDialog}>
          <DialogTitle>Are you sure you want to publish this news?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              The news {neew !== null && `"${neew.en.title}"`} will be published. It will send
              the notification to all the subscribers. You will not be able to unbublish it,
              but you will still be able to edit it, and all changes will be published in time.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.publish} color="primary" autoFocus>
              Publish
            </Button>
            <Button onClick={this.publishDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}