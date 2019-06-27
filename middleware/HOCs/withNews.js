import React from 'react'
import 'isomorphic-unfetch'

export default (Page) => {
  const WithNews = props => <Page {...props} />

  WithNews.getInitialProps = async (ctx) => {
    if(ctx.req) {
      return ctx.query

    } else {

      let tag = (ctx.query && ctx.query.slug) ? 'tag?slug=' + ctx.query.slug : ''
      let data
      data = await fetch('/' + tag, {method: 'POST'})
        .then(res => {
          return res.json()
        })

      return {...data}
    }
  }

  return WithNews
}
