import React from 'react';
import 'isomorphic-unfetch';

export default (Page) => {
  const WithPost = props => <Page {...props} />;

  WithPost.getInitialProps = async (ctx) => {
    if (ctx.req) {
      return ctx.query;
    }

    let data;
    data = await fetch(`/post/${ctx.query.slug}`, { method: 'POST' })
      .then(res => res.json());

    return { ...data };
  };

  return WithPost;
};
