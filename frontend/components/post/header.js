import React from 'react';
import PropTypes from 'prop-types';
import prettyDate from '../../middleware/prettyDate';
import {
  Eye, Comments, Clock, LangIcon,
} from '../icons/postHeader';
import tags from '../../constants/tags';
import Link from '../link';

const PostHeader = ({ post, lang }) => {
  const found = tags.find(x => x.value === post.tag);
  const tagUrl = found.url;
  const Icon = found.icon;

  return (
    <div className="text-sm text-gray-600">
      <span className="mr-4">{`${post.author[lang].name} ${post.author[lang].surname}`}</span>
      {post.exclusive && (
        <span className="mr-4">
          <LangIcon width={20} height={20} className="post-top-icon" />
          &nbsp;
          {post.exclusive === 'en' ? (lang === 'en' ? 'English' : 'Английский') : (lang === 'en' ? 'Russian' : 'Русский')}
        </span>
      )}
      <Link href="/tag" query={{ slug: tagUrl }} as={`/tag/${tagUrl}`}>
        <a className="mr-4 cursor-pointer">
          <Icon width={20} height={20} className="post-top-icon" />
          &nbsp;
          {post.tag}
        </a>
      </Link>

      <span className="mr-4">
        <Clock width={18} height={18} className="post-top-icon" />
        &nbsp;
        {prettyDate(post.publishTime, lang) || post.creationDate}
      </span>
      <span className="mr-4">
        <Comments width={16} height={16} className="post-top-icon" />
        &nbsp;
        {post.comments.length}
      </span>
      <span>
        <Eye width={18} height={22} className="post-top-icon" />
        &nbsp;
        {post.views || 0}
      </span>
    </div>
  );
};

PostHeader.propTypes = {
  lang: PropTypes.string.isRequired,
  post: PropTypes.shape({
    author: PropTypes.object,
    exclusive: PropTypes.string,
    tag: PropTypes.string,
    publishTime: PropTypes.string,
    creationDate: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.object),
    views: PropTypes.number,
  }),
};

PostHeader.defaultProps = {
  post: {},
};

export default PostHeader;
