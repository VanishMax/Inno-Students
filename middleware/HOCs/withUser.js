import React from 'react';

export default (Page) => {
  const WithUser = props => <Page {...props} />;

  WithUser.getInitialProps = async (context) => {
    const { ctx } = context;

    // Get user from the server (Used only in the _app page)
    let userObject = {};
    if (ctx.req && ctx.req.user) {
      userObject = ctx.req.user;
    }

    return {
      ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
      userObject,
    };
  };

  return WithUser;
};
