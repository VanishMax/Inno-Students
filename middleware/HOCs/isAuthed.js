import React from 'react'
import Router from 'next/router'
import {makeURLWithQuery} from '../makeURLWithQuery'
import 'isomorphic-unfetch'

export default Page => {
  const WithAuth = props => <Page {...props} />

  WithAuth.getInitialProps = async ctx => {
    if(ctx.req) {
      if(ctx.req.user) {
        return {user: ctx.req.user}
      } else {
        ctx.res.writeHead(302, { Location: '/user/login' + makeURLWithQuery(ctx.query)})
        ctx.res.end()
      }
    } else {
      const data = await fetch('/user', {method: 'POST'})
        .then( res => {
          return res.json()
        })

      if(data.user) {
        return {user: data.user}
      } else {
        Router.replace({ pathname: '/user/login', query: ctx.query, shallow: true})
        return {}
      }
    }
  }

  return WithAuth
}
