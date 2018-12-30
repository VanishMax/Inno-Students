import React from 'react'
import Header from '../Header'
import { Helmet } from 'react-helmet'
import { Route } from 'react-router'

import config from '#/admin'

import Loadable from "react-loadable"

const AsyncMenu = Loadable({
  loader: () => import(/* webpackChunkName: "AdminMenu" */ './Menu'),
  loading: () => null
})
// const AsyncEdit = Loadable({
//   loader: () => import(/* webpackChunkName: "AdminEdit" */ './Edit'),
//   loading: () => null
// })

class Admin extends React.Component {
  render(){
    return (
      <React.Fragment>
        <Helmet>
          <title>{config.header[this.props.lang]}</title>
          <meta name="description" content="VaMax app" />
        </Helmet>
        <Header/>
        <React.Fragment>
          <Route path="/admins/edit" render={(props) => <AsyncEdit lang={this.props.lang}/>}/>
          <Route path="/admins" render={(props) => <AsyncMenu lang={this.props.lang}/>}/>
        </React.Fragment>
      </React.Fragment>
    )
  }
}

export default Admin
