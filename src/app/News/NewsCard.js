import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import * as Actions from '&/redux/actions'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import CardHeader from '@material-ui/core/CardHeader/CardHeader'
import CardMedia from '@material-ui/core/CardMedia/CardMedia'
import CardContent from '@material-ui/core/CardContent/CardContent'
import Typography from '@material-ui/core/Typography/Typography'
import CardActions from '@material-ui/core/CardActions/CardActions'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card/Card'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'

const styles = {
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
  },
  starred: {
    border: '2px soild gold'
  }
}

class NewsCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      expanded: false
    }
    this.handleExpandClick = this.handleExpandClick.bind(this)
    this.redirect = this.redirect.bind(this)
  }
  handleExpandClick(){
    this.setState({ expanded: !this.state.expanded })
  }
  redirect(id, url, e){
    this.props.actions.getNeew(id)
    this.props.history.push('/news/' + url)
  }
  render(){
    const {expanded} = this.state
    const {neew, lang, starred} = this.props
    const news = neew[lang]

    const time = (neew.publishDate || '') + ', ' + (neew.publishTime || '')
    let timePrint = null
    if(time !== '' && time !== ', '){ timePrint = time}

    return(
      <Card style={starred ? styles.starred : {}} align="left" elevation={4}>
        <CardHeader title={news.title}
                    subheader={<em>{timePrint || "September 14, 2018"}</em>}/>
        <CardMedia
          component="img" alt={news.title || 'Simple Title'} title={news.title}
          width="420" image={'/assets/pics/' + (neew.previewImage || 'Test-Picture.png')}
        />
        <CardContent>
          <Typography component="p">
            {news.lead || 'Some lead sentence just to make water'}
          </Typography>
        </CardContent>
        <CardActions disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <Button variant='contained' color='primary' onClick={ (e) => this.redirect(neew._id, neew.url, e)}>
            Read more
          </Button>
        </CardActions>
      </Card>
    )
  }
}

NewsCard.propTypes = {
  neew: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  starred: PropTypes.bool,
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default withRouter(connect(null, mapDispatchToProps)(NewsCard))
