// import Router from 'next/router'
// import makeURLWithQuery from '../makeURLWithQuery'

import cookies from 'next-cookies'

export default Page => {
  const WithLang = props => <Page {...props} />

  WithLang.getInitialProps = async context => {
    const ctx = context.ctx

    // Find the language from query
    let lang = 'en'
    const { cookieLang } = cookies(ctx)
    if((ctx.query && ctx.query.lang === 'ru') || cookieLang === 'ru') lang = 'ru'

    // Redirect if russian cookies exist but query does not
    // if(cookieLang === 'ru' && ctx.query.lang !== 'ru') {
    //   if (ctx.res) {
    //     ctx.res.writeHead(302, { Location: ctx.pathname + makeURLWithQuery({...ctx.query, lang: 'ru'})})
    //     ctx.res.end()
    //   } else {
    //     Router.replace({ pathname: Router.pathname, query: { ...ctx.query, lang: 'ru' }, shallow: true})
    //   }
    // }

    return {
      ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
      lang: lang,
      path: ctx.pathname
    }
  }

  return WithLang
}
