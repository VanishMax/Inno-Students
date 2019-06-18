import React from 'react'
import Lang from '../../langs/post'

export default ({post, lang}) => {
  return (
    <div className="text-sm text-gray-600">
      <span className="mr-4">{post.author[lang].name + ' ' + post.author[lang].surname}</span>
      <span className="mr-4">{post.tag}</span>
      <span className="mr-4">{post.publishTime || post.creationDate}</span>
      <span className="mr-4">{post.comments.length} {Lang.comments[lang]}</span>
      <span>{post.views || 0} {Lang.views[lang]}</span>
    </div>
  )
}
