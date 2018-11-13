import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import CardHeader from '@material-ui/core/CardHeader/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia/CardMedia'
import CardContent from '@material-ui/core/CardContent/CardContent'
import Typography from '@material-ui/core/Typography/Typography'
import CardActions from '@material-ui/core/CardActions/CardActions'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Collapse from '@material-ui/core/Collapse/Collapse'
import Card from '@material-ui/core/Card/Card'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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
  }
}

class Preview extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      expanded: false
    }
    this.handleExpandClick = this.handleExpandClick.bind(this)
  }
  handleExpandClick(){
    this.setState({ expanded: !this.state.expanded })
  }
  render(){
    const {expanded} = this.state
    const {neew, style, lang} = this.props
    const news = neew[lang]

    const time = (neew.publishDate || '') + ', ' + (neew.publishTime || '')
    let timePrint = null
    if(time != '' && time != ', '){ timePrint = time}

    return(
      <Card style={style} align="left" elevation={4}>
        <CardActionArea onClick={ () => this.props.history.push('/news/' + neew.url)}>
          <CardHeader title={news.title}
                      subheader={timePrint || "September 14, 2018"}/>
          <CardMedia
            component="img" alt={news.title || 'Simple Title'} title={news.title}
            width="420" image={'/assets/pics/' + (neew.previewImage || 'Test-Picture.png')}
          />
          <CardContent>
            <Typography component="p">
              {news.lead || 'Some lead sentence just to make water'}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          {(news.content != null && news.content.length < 600) ?
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
        {(news.content != null && news.content.length < 600) ?
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent dangerouslySetInnerHTML={{__html: news.content}}/>
          </Collapse>
          : <React.Fragment/>
        }
      </Card>
    )
  }
}

Preview.propTypes = {
  neew: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  style: PropTypes.object
}

export default withRouter(Preview)