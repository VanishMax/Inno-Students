import React from 'react'
import Router from 'next/router'

export default ({posts, lang, isPublished}) => {
  if(isPublished === undefined) isPublished = false

  return (
    <div className="w-2/3 mx-auto">
      <div className="bg-white shadow-md rounded my-6">
        <table className="text-left w-full border-collapse">
          <thead className="font-bold uppercase text-sm text-grey-dark">
            <tr>
              <th className="py-4 px-6  border-b border-grey-light">
                #
              </th>
              <th className="py-4 px-6 border-b border-grey-light">
                Tag
              </th>
              <th className="py-4 px-6 border-b border-grey-light">
                Title
              </th>
              <th className="py-4 px-6 border-b border-grey-light">
                {isPublished ? 'Publish time': 'Creation date'}
              </th>
            </tr>
          </thead>
          <tbody>
          {posts.map((post, i) =>
            <tr key={i}
                onClick={() => Router.push({ pathname: '/post/' + post.url, query: Router.query})}
                className="cursor-pointer hover:bg-gray-100">
              <td className="py-4 px-6 border-b border-gray-100">
                {i}
              </td>
              <td className="py-4 px-6 border-b border-gray-100">
                {post.tag}
              </td>
              <td className="py-4 px-6 border-b border-gray-100">
                {post[lang].title}
              </td>
              <td className="py-4 px-6 border-b border-gray-100">
                {isPublished ? post.publishTime : post.creationDate}
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
