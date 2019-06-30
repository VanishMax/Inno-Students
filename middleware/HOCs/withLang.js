import cookies from 'next-cookies'

export default Page => {
  const WithLang = props => <Page {...props} />

  WithLang.getInitialProps = async context => {
    const ctx = context.ctx

    // Find the language from query or cookie
    let lang = 'en'
    const { cookieLang } = cookies(ctx)
    if(cookieLang === 'ru') lang = 'ru'
    if(ctx.req && ctx.req.query.lang && ctx.req.query.lang === 'ru') lang = 'ru'

    return {
      ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
      lang: lang,
      path: ctx.pathname
    }
  }

  return WithLang
}
