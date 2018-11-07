import React, {Component} from 'react'
import { Switch, Route } from 'react-router'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'

import Loadable from "react-loadable"
import Loading from '&/Loading'
const AsyncHome = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ './Home'),
  loading: Loading,
  delay: 500,
})
const AsyncAdmin = Loadable({
  loader: () => import(/* webpackChunkName: "Admin" */ './Admin'),
  loading: Loading,
  delay: 500,
})

class App extends Component {

  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }


  render() {
    return(
      <Switch>
        <Route exact path="/" render={(props) => <AsyncHome lang={this.props.lang} location={props.location}/>}/>
        <Route path="/admins/edit" render={(props) => <AsyncAdmin lang={this.props.lang} location={props.location} edit={true}/>}/>
        <Route path="/admins" render={(props) => <AsyncAdmin lang={this.props.lang} location={props.location} edit={false}/>}/>
        <Route path="/ru" render={(props) => <AsyncHome lang={this.props.lang} location={props.location}/>}/>
      </Switch>
    )
  }
}

const mapStateToProps = (state) => ({
  lang: state.lang
})

export default withRouter(connect( mapStateToProps, null )(App))
