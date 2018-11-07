import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SvgIcon from '@material-ui/core/SvgIcon'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'

import LangMenu from './LangMenu'


export default class Header extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <SvgIcon aria-label="Menu" style={{marginLeft: -12, marginRight: 20, fontSize: 50, color: "#FFF"}}>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
          </Link>
          <Typography variant="title" color="inherit">
            {this.props.title}
          </Typography>
          <LangMenu lang={this.props.lang}/>
          <Link to='/admins'>Admins</Link>
        </Toolbar>
      </AppBar>
    )
  }
}