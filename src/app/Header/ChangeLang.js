import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '&/redux/actions'
import { withRouter } from 'react-router'

class ChangeLang extends React.Component{
  constructor(props){
    super(props)
    this.state = { link: '' }
    this.props.lang == "en" ? this.state.english = true : this.state.english = false
    this.changeLang  = this.changeLang.bind(this)
  }

  componentDidMount() {
    let uri = window.location.pathname
    uri = uri.replace('/', '')
    uri = uri.replace('/en', '')
    console.log(uri)
    this.setState({ link: uri })
  }
  changeLang(){
    if(this.state.english){
      this.props.actions.changeLang("ru")
      this.props.history.push('/' + this.state.link)
    } else {
      this.props.actions.changeLang("en")
      this.props.history.push('/en/' + this.state.link)
    }
    this.setState({ english: !this.state.english })
  }

  render() {
    const { english } = this.state
    return (
      <React.Fragment>
        <FormControlLabel labelPlacement="start"
          control={ <Switch checked={english} onChange={this.changeLang} value="switchLang"/> }
          label={ this.props.lang == "en" ? "English" : "Английский" }
        />
      </React.Fragment>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeLang))
