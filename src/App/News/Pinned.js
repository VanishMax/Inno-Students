import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia/CardMedia'
import CardContent from '@material-ui/core/CardContent/CardContent'
import Typography from '@material-ui/core/Typography/Typography'
import Card from '@material-ui/core/Card/Card'

const styles = {
  card: {
    display: 'flex'
  },
  pic: {
    display: 'flex',
    flexDirection: 'column',
    width: '40%'
  },
  content: {
    flex: '1 0 auto'
  }
}

class Pinned extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const {neew, lang} = this.props
    const news = neew[lang]

    const time = (neew.publishDate || '') + ', ' + (neew.publishTime || '')
    let timePrint = null
    if(time != '' && time != ', '){ timePrint = time}

    return(
      <Card align="left" elevation={4}>
        <CardActionArea onClick={ () => this.props.history.push('/news/' + neew.url)} style={styles.card}>

          <CardMedia
            component="img" alt={news.title || 'Simple Title'} title={news.title} style={styles.pic}
            width="420" image={'/assets/pics/' + (neew.previewImage || 'Test-Picture.png')}
          />

          <CardContent style={styles.content}>
            <Typography component="h5" variant="h5">
              {news.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <em>{timePrint || "September 14, 2018"}</em>
            </Typography>
            <br/>
            <Typography variant='body1'>
              {news.lead || 'Some lead sentence just to make water'}
            </Typography>
          </CardContent>

        </CardActionArea>
      </Card>
    )
  }
}

Pinned.propTypes = {
  neew: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
}

export default withRouter(Pinned)