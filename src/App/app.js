import React from 'react'
import { Switch, Route } from 'react-router'

import isAdminHOC from '&/isAdminHOC'

import Loadable from 'react-loadable'
import Loading from '~/src/Loading'
const AsyncHome = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ './Home'),
  loading: Loading,
  delay: 300,
})
const AsyncAbout = Loadable({
  loader: () => import(/* webpackChunkName: "About" */ './About'),
  loading: Loading,
  delay: 300,
})
const AsyncAdmin = Loadable({
  loader: () => import(/* webpackChunkName: "About" */ './Admin'),
  loading: Loading,
  delay: 300,
})



export default function App() {
  const Admin = isAdminHOC(AsyncAdmin)
  return(
    <Switch>
      <Route exact path="/" component={ AsyncHome }/>
      <Route exact path="/about" component={ AsyncAbout }/>
      <Route exact path="/admins" component={ (props) => <Admin lang="ru"/> }/>
    </Switch>
  )
}
