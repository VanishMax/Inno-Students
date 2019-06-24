import React from 'react'
import {Eye, Comments, Clock} from '../icons/postHeader'
import tags from '../../constants/tags'

export default ({post, lang}) => {

  let found = tags.find(x => x.value === post.tag)
  const Icon = found.icon

  return (
    <div className="text-sm text-gray-600">
      <span className="mr-4">{post.author[lang].name + ' ' + post.author[lang].surname}</span>
      <span className="mr-4">
        <Icon width={16} height={16} className="post-top-icon" />&nbsp;
        {post.tag}
      </span>
      <span className="mr-4">
        <Clock width={16} height={16} className="post-top-icon" />&nbsp;
        {post.publishTime || post.creationDate}
      </span>
      <span className="mr-4">
        <Comments width={16} height={16} className="post-top-icon" />&nbsp;
        {post.comments.length}</span>
      <span>
        <Eye width={18} height={22} className="post-top-icon" />&nbsp;
        {post.views || 0}
      </span>
    </div>
  )
}
