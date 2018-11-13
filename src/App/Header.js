import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'
import { Link } from 'react-router-dom'

import LangMenu from './LangMenu'

const styles = {
  grow: {
    flexGrow: 1
  }
}

export default class Header extends React.Component {
  render() {
    return (
      <div style={styles.grow}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
              <HomeIcon style={{marginLeft: -12, marginRight: 20, fontSize: 40, color: "#FFF"}}/>
            </Link>
            <Typography variant="h6" color="inherit" style={styles.grow}>
              {this.props.title}
            </Typography>
            <React.Fragment>
              <Link to='/aboutUs'>
                <Typography variant='button'>About Us</Typography>
              </Link>
              <LangMenu lang={this.props.lang}/>
              <Link to='/admins'>Admins</Link>
            </React.Fragment>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired
}