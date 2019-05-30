const authErrorHOC = Page => {
  const AuthError = props => <Page {...props} />

  AuthError.getInitialProps = async ctx => {

    let message = ''
    if(ctx.query && ctx.query.error) message = ctx.query.error.message

    return {
      ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
      message: message
    }
  }

  return AuthError
}

export default authErrorHOC
