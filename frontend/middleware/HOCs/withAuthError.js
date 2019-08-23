import React from 'react';

export default (Page) => {
  const WithAuthError = props => <Page {...props} />;

  WithAuthError.getInitialProps = async (ctx) => {
    // Get the message about authentication error from the server
    let errorMessage = '';
    if (ctx.query && ctx.query.error) errorMessage = ctx.query.error.message;
    else if (ctx.query && ctx.query.message) errorMessage = ctx.query.message;

    return {
      ...(Page.getInitialProps ? await Page.getInitialProps(ctx) : {}),
      errorMessage,
    };
  };

  return WithAuthError;
};
