import React from 'react'
import PropTypes from 'prop-types'
import CardHeader from "@material-ui/core/CardHeader/CardHeader"
import CardMedia from "@material-ui/core/CardMedia/CardMedia"
import CardContent from "@material-ui/core/CardContent/CardContent"
import Typography from "@material-ui/core/Typography/Typography"
import CardActions from "@material-ui/core/CardActions/CardActions"
import IconButton from "@material-ui/core/IconButton/IconButton"
import FavoriteIcon from "@material-ui/core/SvgIcon/SvgIcon"
import Collapse from "@material-ui/core/Collapse/Collapse"
import Card from "@material-ui/core/Card/Card"

class Preview extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    const {neew, style, lang} = this.props
    const news = neew[lang]

    return(
      <div>This is a News card</div>
    )
  }
}

Preview.propTypes = {
  neew: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  style: PropTypes.object
}

export default Preview