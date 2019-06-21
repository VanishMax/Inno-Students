import React from 'react'
import 'isomorphic-unfetch'

export default (Page, url = '') => {
  const WithNews = props => <Page {...props} />

  WithNews.getInitialProps = async (ctx) => {
    if(ctx.req) {
      return ctx.query

    } else {

      let data
      data = await fetch('/' + url, {method: 'POST'})
        .then(res => {
          return res.json()
        })

      return {...data}
    }
  }

  return WithNews
}
