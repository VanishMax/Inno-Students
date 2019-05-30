const authErrorHOC = Page => {
  const AuthError = props => <Page {...props} />

  AuthError.getInitialProps = async ctx => {

    let message = ''
    if(ctx.query && ctx.query.error) message = ctx.query.error.message
    else if(ctx.query && ctx.query.message) message = ctx.query.message

    return {
      ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
      message: message
    }
  }

  return AuthError
}

export default authErrorHOC
