import React from 'react'
import Router from 'next/router'
import 'isomorphic-unfetch'
import makeURLWithQuery from '../makeURLWithQuery'

export default Page => {
  const WithData = props => <Page {...props} />

  WithData.getInitialProps = async (ctx) => {
    if(ctx.req) {
      if(ctx.query.user) {
        return ctx.query
      } else {
        ctx.res.writeHead(302, {Location: '/user/login' + makeURLWithQuery(ctx.query)})
        ctx.res.end()
      }

    } else {

      let data

      data = await fetch(ctx.pathname, {method: 'POST'})
        .then(res => {
          return res.json()
        })

      if(!data.user) return Router.replace({ pathname: '/user/login', query: ctx.query, shallow: true})

      return {...data}
    }
  }

  return WithData
}
