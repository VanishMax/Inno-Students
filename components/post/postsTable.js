import React from 'react';
import Router from 'next/router';
import tags from '../../constants/tags';

export default ({
  posts, lang, isPublished = false, authors = false,
}) => {
  const toIcon = (tag) => {
    const found = tags.find(x => x.value === tag);
    const Icon = found.icon;
    return <Icon />;
  };

  return (
    <div className="w-full md:w-2/3">
      <div className="bg-white shadow-md rounded my-6">
        <table className="text-left w-full border-collapse">
          <thead className="font-bold uppercase text-sm text-grey-dark">
            <tr>
              <th className="py-4 px-2 md:px-6  border-b border-grey-light">
                #
              </th>
              <th className="py-4 px-2 md:px-6 border-b border-grey-light">
                Tag
              </th>
              <th className="py-4 px-2 md:px-6 border-b border-grey-light">
                Title
              </th>
              {authors
              && (
              <th className="py-4 px-2 md:px-6 border-b border-grey-light">
                Author
              </th>
              )
              }
              <th className="py-4 px-2 md:px-6 border-b border-grey-light">
                {isPublished ? 'Publish time' : 'Creation date'}
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, i) => (
              <tr
                key={i}
                onClick={() => Router.push({
                  pathname: '/post',
                  query: { ...Router.query, slug: post.url },
                }, `/post/${post.url}`)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="py-4 px-2 md:px-6 border-b border-gray-100">
                  {i}
                </td>
                <td className="py-4 px-2 md:px-6 border-b border-gray-100">
                  <span className="inline-block w-6 h-6">{toIcon(post.tag)}</span>
                </td>
                <td className="py-4 px-2 md:px-6 border-b border-gray-100">
                  {post[lang].title}
                </td>
                {authors
              && (
              <th className="py-4 px-2 md:px-6 border-b border-gray-100">
                {post.author.username}
              </th>
              )
              }
                <td className="py-4 px-2 md:px-6 border-b border-gray-100">
                  {isPublished ? post.publishTime : post.creationDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
