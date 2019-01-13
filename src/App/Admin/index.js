import React from 'react'
import Header from '../Header'
import { Helmet } from 'react-helmet'
import { Route } from 'react-router'

import config from '#/admin'

import LoadableHOC from '&/HOCs/LoadableHOC'
const AsyncMenu = LoadableHOC({
  loader: () => import(/* webpackChunkName: "AdminMenu" */ './Menu'),
})
const AsyncEdit = LoadableHOC({
  loader: () => import(/* webpackChunkName: "AdminEdit" */ './Edit'),
})

export default function (props) {
  return (
    <React.Fragment>
      <Helmet>
        <title>{config.header[props.lang]}</title>
        <meta name="description" content="VaMax app" />
      </Helmet>
      <Header/>
      <React.Fragment>
        <Route path="/admins/edit" render={() => <AsyncEdit lang={props.lang}/>}/>
        <Route exact path="/admins" render={() => <AsyncMenu lang={props.lang}/>}/>
      </React.Fragment>
    </React.Fragment>
  )
}
