import React from 'react'
import Router from 'next/router'
import 'isomorphic-unfetch'
import makeURLWithQuery from '../makeURLWithQuery'

export default Page => {
  const WithPost = props => <Page {...props} />

  WithPost.getInitialProps = async (ctx) => {
    let data, user
    if(ctx.req) {
      if(ctx.query.user) {
        return ctx.query
      } else {
        ctx.res.writeHead(302, {Location: '/user/login' + makeURLWithQuery(ctx.query)})
        ctx.res.end()
      }

    } else {

      data = await fetch(ctx.pathname, {method: 'POST'})
        .then(res => {
          return res.json()
        })
      if(data.user) {
        user = data.user
      } else {
        Router.replace({ pathname: '/user/login', query: ctx.query, shallow: true})
      }
    }
    return {posts: data.posts, user: user}
  }

  return WithPost
}
