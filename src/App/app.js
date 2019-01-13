import React from 'react'
import { Switch, Route } from 'react-router'

import isAdminHOC from '&/HOCs/isAdminHOC'

import LoadableHOC from '&/HOCs/LoadableHOC'
const AsyncHome = LoadableHOC({ loader: () => import(/* webpackChunkName: "Home" */ './Home') })
const AsyncAbout = LoadableHOC({ loader: () => import(/* webpackChunkName: "About" */ './About') })
const AsyncAdmin = LoadableHOC({ loader: () => import(/* webpackChunkName: "About" */ './Admin') })


export default function App() {
  const Admin = isAdminHOC(AsyncAdmin)
  return(
    <Switch>
      <Route exact path="/" component={ AsyncHome }/>
      <Route exact path="/about" component={ AsyncAbout }/>
      <Route path="/admins" component={ () => <Admin lang="ru"/> }/>
    </Switch>
  )
}
