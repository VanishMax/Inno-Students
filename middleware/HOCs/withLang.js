import cookies from 'next-cookies'
import Router from 'next/router'
import {makeURLWithQuery} from '../makeURLWithQuery'

const withCookiesHOC = Page => {
  const WithCookies = props => <Page {...props} />

  WithCookies.getInitialProps = async context => {
    const ctx = context.ctx
    let lang = 'en'
    const { cookieLang } = cookies(ctx)
    if((ctx.query && ctx.query.lang === 'ru') || cookieLang === 'ru') lang = 'ru'

    if(cookieLang === 'ru' && ctx.query.lang !== 'ru') {
      if (ctx.res) {
        ctx.res.writeHead(302, { Location: ctx.pathname + makeURLWithQuery({...ctx.query, lang: 'ru'})})
        ctx.res.end()
      } else {
        Router.replace({ pathname: Router.pathname, query: { ...ctx.query, lang: 'ru' }, shallow: true})
      }
    }

    return {
      ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
      lang: lang,
      path: ctx.pathname
    }
  }

  return WithCookies
}

export default withCookiesHOC
