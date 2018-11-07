import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '&/redux/actions'

class LangMenu extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      anchorEl: null,
      link: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.changeLang  = this.changeLang.bind(this)
  }

  componentDidMount() {
    let uri = window.location.pathname
    uri = uri.replace('/ru', '')
    uri = uri.replace('/', '')
    this.setState({link: uri})
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose(){
    this.setState({ anchorEl: null })
  }

  changeLang(value, event){
    this.setState({ anchorEl: null })
    this.props.actions.changeLang(value)
  }

  render() {
    const { anchorEl } = this.state
    var open = Boolean(anchorEl)
    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {this.props.lang == "en" ? "Language" : "Язык"}
        </Button>
          <Menu id="simple-menu" open={open} anchorEl={anchorEl} onClose={this.handleClose}>
            <Link to={'/' + this.state.link}>
              <MenuItem
                onClick={(e) => this.changeLang("en", e)}
              >
                English
              </MenuItem>
            </Link>
            <Link to={'/ru/' + this.state.link}>
              <MenuItem
              onClick={(e) => this.changeLang("ru", e)}
              >
                Русский
              </MenuItem>
            </Link>
          </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  lang: state.lang,
  state: state
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LangMenu)