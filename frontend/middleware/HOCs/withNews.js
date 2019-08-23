import React from 'react';
import 'isomorphic-unfetch';

export default (Page) => {
  const WithNews = props => <Page {...props} />;

  WithNews.getInitialProps = async (ctx) => {
    if (ctx.req) {
      return ctx.query;
    }

    const tag = (ctx.query && ctx.query.slug) ? `tag?slug=${ctx.query.slug}` : '';
    const data = await fetch(`/${tag}`, { method: 'POST' })
      .then(res => res.json());

    return { ...data };
  };

  return WithNews;
};
