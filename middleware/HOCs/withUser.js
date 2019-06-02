const withAuthHOC = Page => {
  const WithAuth = props => <Page {...props} />

  WithAuth.getInitialProps = async context => {
    const ctx = context.ctx

    let user = {}
    if(ctx.req && ctx.req.user) {
      user = ctx.req.user
    }

    return {
      ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
      user: user
    }
  }

  return WithAuth
}

export default withAuthHOC
