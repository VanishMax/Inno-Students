import React from 'react'
import { Switch, Route } from 'react-router'
import Header from './Header'

import isAdminHOC from '&/HOCs/isAdminHOC'
import LoadableHOC from '&/HOCs/LoadableHOC'
const AsyncHome = LoadableHOC({ loader: () => import(/* webpackChunkName: "Home" */ './Home') })
const AsyncAbout = LoadableHOC({ loader: () => import(/* webpackChunkName: "About" */ './About') })
const AsyncAdmin = LoadableHOC({ loader: () => import(/* webpackChunkName: "About" */ './Admin') })
const AsyncNeew = LoadableHOC({ loader: () => import(/* webpackChunkName: "Neew" */ './News/FullNews') })


export default function App() {
  const Admin = isAdminHOC(AsyncAdmin)
  return(
    <React.Fragment>
      <Header lang="ru"/>
      <Switch>
        <Route exact path="/" component={ () => <AsyncHome lang="ru"/> }/>
        <Route exact path="/about" component={ AsyncAbout }/>
        <Route path="/admins" component={ () => <Admin lang="ru"/> }/>
        <Route path="/news/:neew" render={(props) => <AsyncNeew lang="ru" location={props.location}/>}/>
      </Switch>
    </React.Fragment>
  )
}
