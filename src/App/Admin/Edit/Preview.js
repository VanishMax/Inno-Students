import React from 'react'
import Paper from '@material-ui/core/Paper/Paper'
import Typography from '@material-ui/core/Typography/Typography'
import Divider from '@material-ui/core/Divider'
import Button from "@material-ui/core/Button/Button"
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions/DialogActions"
import Dialog from "@material-ui/core/Dialog/Dialog"
import axios from "axios"

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
      expanded: false,
      toDelete: false,
      publishDialog: false,
      published: false,
      time: '',
    }
    this.handleExpandClick = this.handleExpandClick.bind(this)
    this.deleteNewsDialog = this.deleteNewsDialog.bind(this)
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
    const {neew, toDelete, expanded, publishDialog, published, time} = this.state
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
            <Typography variant="headline">
              Preview
            </Typography>
            <Typography variant="subheading">
              How your news will look like:
            </Typography>
          <Divider/>

          {neew !== null &&
            <Card style={styles.card} align="left">
              <CardHeader title={neew.en.title}
                          subheader={timePrint || "September 14, 2018"}/>
              <CardMedia
                component="img" alt={neew.en.title} title={neew.en.title}
                width="420" image={'/assets/pics/' + (neew.previewImage || 'Test-Picture.png')}
              />
              <CardContent>
                <Typography component="p">
                  {neew.en.lead}
                </Typography>
              </CardContent>
              <CardActions disableActionSpacing>
                <IconButton aria-label="Add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="Share">
                  <ShareIcon />
                </IconButton>
                {(neew.en.content != null && neew.en.content.length < 600) ?
                  <IconButton onClick={this.handleExpandClick} aria-expanded={this.state.expanded}
                              aria-label="Show more" style={styles.expandIcon}>
                    {this.state.expanded ?
                      <div style={styles.expand}><ExpandMoreIcon/></div>
                      : <div style={styles.expand0}><ExpandMoreIcon/></div>
                    }
                  </IconButton>
                  : <React.Fragment/>
                }
              </CardActions>
              {(neew.en.content != null && neew.en.content.length < 600) ?
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent dangerouslySetInnerHTML={{__html: neew.en.content}}/>
                </Collapse>
                : <React.Fragment/>
              }
            </Card>
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