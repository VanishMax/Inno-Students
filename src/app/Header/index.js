import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

// import ChangeLang from './ChangeLang'
import localization from '#/header'

const styles = {
  link: {
    color: 'inherit'
  },
  about: {
    textDecoration: 'none',
    color: 'inherit',
    marginLeft: 30
  }
}

export default function Index(props) {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={styles.link}>
            <Typography variant="h5" color="inherit">
              Inno Media Club
            </Typography>
          </Link>
          <Link to="/about" style={styles.about}>
            <Typography variant="h5" color="inherit">
              { localization.about[props.lang] || localization.about.ru }
            </Typography>
          </Link>
          <Link to="/admins" style={styles.about}>
            <Typography variant="h5" color="inherit">
              { localization.admins[props.lang] || localization.admins.ru }
            </Typography>
          </Link>
          {/*<div style={{ marginLeft: 30 }}>*/}
            {/*<ChangeLang/>*/}
          {/*</div>*/}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
