import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { bucket } from '../../constants/user';
import prettyDate from '../../middleware/prettyDate';
import printName from '../../middleware/printName';

const NewsCard = ({
  news, big, last, lang,
}) => {
  const url = `url("${bucket + news.img}")`;

  const top = [];
  top.push(printName(lang, news.author));
  top.push(news.tag);
  top.push(prettyDate(news.publishTime, lang));
  if (news.exclusive === 'en') top.push(lang === 'en' ? 'English' : 'Английский');
  if (news.exclusive === 'ru') top.push(lang === 'en' ? 'Russian' : 'Русский');

  const redirect = () => {
    Router.push({
      pathname: '/post',
      query: { slug: news.url },
    }, `/post/${news.url}${lang === 'ru' ? '?lang=ru' : ''}`);
  };

  return (
    <React.Fragment>
      <div
        onClick={redirect}
        className={`news-card${last ? '' : ' md:mr-6 md:mb-0 mb-6'}${big ? ' big' : ''}`}
      >
        <div className="news-card-cover" style={{ backgroundImage: url }} />
        <div className="news-card-overlay" />
        <div className="news-card-caption">
          <div className="small">
            {top.map((toppy, i) => (
              <span key={i}>{toppy}</span>
            ))}
          </div>
          <div className="big">{news[lang].title}</div>
        </div>
      </div>
      { last && <br className="fullBr" /> }
    </React.Fragment>
  );
};

NewsCard.propTypes = {
  lang: PropTypes.string.isRequired,
  big: PropTypes.bool,
  last: PropTypes.bool,
  news: PropTypes.shape({
    img: PropTypes.string,
    tag: PropTypes.string,
    exclusive: PropTypes.string,
    publishTime: PropTypes.string,
    url: PropTypes.string,
    author: PropTypes.object,
  }),
};

NewsCard.defaultProps = {
  big: false,
  last: false,
  news: {},
};

export default NewsCard;
