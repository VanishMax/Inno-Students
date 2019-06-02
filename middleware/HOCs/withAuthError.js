export default Page => {
  const WithAuthError = props => <Page {...props} />

  WithAuthError.getInitialProps = async ctx => {

    // Get the message about authentication error from the server
    let message = ''
    if(ctx.query && ctx.query.error) message = ctx.query.error.message
    else if(ctx.query && ctx.query.message) message = ctx.query.message

    return {
      ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
      message: message
    }
  }

  return WithAuthError
}
