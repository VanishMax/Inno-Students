import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { bucket } from '../../constants/user';

const PostHead = ({ post, lang, isPublished }) => (
  <Head>
    <title>{post[lang].title}</title>

    {isPublished && (
      <React.Fragment>
        <meta name="keywords" content="Inno Students, media club, Innopolis University, article, post, news" />
        <meta name="description" content={post[lang].lead} />
        <meta
          name="author"
          content={`${post.author[lang].name ? `${post.author[lang].name} ${post.author[lang].surname}` : post.author.username
          }, //${post.author.website}`}
        />

        <meta name="og:type" content="article" />
        <meta name="og:title" content={post[lang].title} />
        <meta name="og:url" content={`/post/${post.url}`} />
        <meta name="og:image" content={bucket + post.img} />
        <meta name="og:description" content={post[lang].lead} />
        <meta property="article:author" content={`//${post.author.website}`} />
        <meta property="article:publishedTime" content={post.publishTime} />
      </React.Fragment>
    )}
  </Head>
);

PostHead.propTypes = {
  lang: PropTypes.string.isRequired,
  isPublished: PropTypes.bool.isRequired,
  post: PropTypes.shape({
    author: PropTypes.object,
    url: PropTypes.string,
    img: PropTypes.string,
    publishTime: PropTypes.string,
  }),
};

PostHead.defaultProps = {
  post: {},
};

export default PostHead;
