import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import axios from "axios"
import Button from "@material-ui/core/Button/Button"
import Typography from "@material-ui/core/Typography/Typography"
import List from "@material-ui/core/List/List"
import Divider from "@material-ui/core/Divider/Divider"
import ListItem from "@material-ui/core/ListItem/ListItem"
import ListItemText from "@material-ui/core/ListItemText/ListItemText"
import Paper from "@material-ui/core/Paper/Paper"
import Receipt from '@material-ui/icons/Receipt'
import DirectionsRun from '@material-ui/icons/DirectionsRun'
import Mood from '@material-ui/icons/Mood'
import Domain from '@material-ui/icons/Domain'


class EditAfter extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      newsToEditLoaded: false,
      newsToEdit: null,
      readyNewsLoaded: false,
      readyNews: null,
      redir: ''
    }
    this.setRedir = this.setRedir.bind(this)
    this.loadReady = this.loadReady.bind(this)
  }
  componentDidMount(){
    axios.post('/admins/getNewsToEdit')
      .then((response) => {
        this.setState({newsToEditLoaded: true, newsToEdit: response.data.news})
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  setRedir(value, event){
    this.setState({redir: value})
  }
  loadReady(){
    axios.post('/admins/getPublishedNews')
      .then((response) => {
        this.setState({readyNewsLoaded: true, readyNews: response.data.news})
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  render(){
    const { editToggle } = this.props
    const { newsToEditLoaded, newsToEdit, redir, readyNewsLoaded, readyNews } = this.state
    if(redir !== ''){
      return(
        <Redirect to={"/admins/edit/" + redir}/>
      )
    }
    return(
      <div>
        <Button variant="contained" onClick={editToggle} style={{ marginBottom: 10 }}>
          Go back
        </Button>
        <Typography variant="h5">List of unpublished news</Typography>
        { (newsToEditLoaded && newsToEdit != null) ?
          <List>
            <Divider/>
            {newsToEdit.map( (neew) =>
              <div key={neew._id}>
                <ListItem button onClick={(e) => this.setRedir(neew.url, e)}>
                  {neew.category == "News" && <Receipt/>}
                  {neew.category == "Funny" && <Mood/>}
                  {neew.category == "Sport" && <DirectionsRun/>}
                  {neew.category == "Students life" && <Domain/>}
                  <ListItemText primary={neew.en.title}/>
                </ListItem>
                <Divider/>
              </div>
            ) }
          </List>
          :
          <Typography variant="subtitle1" color="primary">
            At the moment there are no unpublished news
          </Typography>
        }

        <Typography variant="h5">List of Published news</Typography>
        { (readyNewsLoaded && readyNews != null) ?
          <List>
            <Divider/>
            {readyNews.map( (neew) =>
              <div key={neew._id}>
                <ListItem button onClick={(e) => this.setRedir(neew.url, e)}>
                  {neew.category == "News" && <Receipt/>}
                  {neew.category == "Funny" && <Mood/>}
                  {neew.category == "Sport" && <DirectionsRun/>}
                  {neew.category == "Students life" && <Domain/>}
                  <ListItemText primary={neew.en.title}/>
                </ListItem>
                <Divider/>
              </div>
            ) }
          </List>
          :
          <Button variant="contained" color="primary"
                  onClick={this.loadReady} style={{ marginTop: 10 }}>
            Load
          </Button>
        }
      </div>
    )
  }
}

EditAfter.propTypes = {
  editToggle: PropTypes.func.isRequired
}
export default EditAfter
