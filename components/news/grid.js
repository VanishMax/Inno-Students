import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import 'isomorphic-unfetch';

import NewsCard from './card';
import LoadMore from '../icons/loadMore';
import Link from '../link';

const NewsGrid = ({ posts, lang }) => {
  // Go from props to state cause we will change it with loading
  // And subscribe with useEffect on props change
  const [manyPosts, editPosts] = useState(posts);
  useEffect(() => {
    editPosts(posts);
  }, [posts]);

  // Make use of pagination with limit and offset
  const limit = 6;
  const [offset, editOffset] = useState(limit);
  const [showMore, changeShow] = useState(manyPosts.length >= limit);

  // Load more posts
  const loadPosts = async () => {
    const data = await fetch(Router.pathname + (Router.query.slug ? `?slug=${Router.query.slug}` : ''), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ limit, offset }),
    }).then(res => res.json());
    editPosts(manyPosts.concat(data.posts));

    if (data.posts.length < limit) changeShow(false);
    editOffset(offset + limit);
  };

  return (
    <div className="news-grid">
      {manyPosts.length === 0 ? (
        <div className="text-lg leading-loose text-center">
          <p>
            {lang === 'en' ? 'No posts found' : 'Нет подходящих публикаций'}
            {' '}
          </p>
          <p>
            {lang === 'en' ? 'Try ' : 'Попробуйте '}
            <Link href="/tag" query={{ slug: 'article' }} as="/tag/article">
              <a className="underline hover:text-green-800">
                {lang === 'en' ? 'reading articles' : 'почитать статьи'}
              </a>
            </Link>
            {lang === 'en' ? ' or ' : ' или '}
            <Link href="/tag" query={{ slug: 'video' }} as="/tag/video">
              <a className="underline hover:text-green-800">
                {lang === 'en' ? 'view videos' : 'посмотреть видео'}
              </a>
            </Link>
          </p>
        </div>
      ) : (
        <React.Fragment>
          <div className="news-grid-row md:flex-row flex-col">
            {manyPosts.map((post, i) => (
              <NewsCard
                key={i}
                big={i % 3 === 0}
                lang={lang}
                news={post}
                last={i % 3 === 2 || i % 3 === 0}
              />
            ))}
          </div>

          {showMore && (
            <div onClick={loadPosts} className="flex flex-col justify-center items-center h-40 w-full cursor-pointer hover:text-gray-800">
              <LoadMore width={30} height={25} />
              <span className="text-sm leading-relaxed">{lang === 'en' ? 'Load more' : 'Загрузить еще'}</span>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

NewsGrid.propTypes = {
  lang: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object),
};

NewsGrid.defaultProps = {
  posts: [],
};

export default NewsGrid;
