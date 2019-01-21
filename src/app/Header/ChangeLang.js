import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '&/redux/actions'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router'

class ChangeLang extends React.Component{
  constructor(props){
    super(props)
    this.state = { link: '' }
    this.props.lang == "en" ? this.setState({ english: true }) : this.setState({ english: false })
    this.changeLang  = this.changeLang.bind(this)
  }

  componentDidMount() {
    let uri = window.location.pathname
    uri = uri.replace('/ru', '')
    uri = uri.replace('/', '')
    console.log(uri)
    this.setState({ link: uri })
  }
  changeLang(){
    if(this.state.english){
      this.props.actions.changeLang("ru")
      this.props.history.push('/ru/' + this.state.link)
    } else {
      this.props.actions.changeLang("en")
      this.props.history.push('/' + this.state.link)
    }
    this.setState({ english: !this.state.english })
  }

  render() {
    const { english } = this.state
    return (
      <div style={{ marginLeft: 30 }}>
        <FormControlLabel
          control={ <Switch checked={english} onChange={this.changeLang} value="switchLang"/> }
          label={ this.props.lang == "en" ? "English" : "Английский" }
        />
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeLang))
