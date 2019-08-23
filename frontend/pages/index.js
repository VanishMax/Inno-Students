import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/default';
import { LangContext } from '../middleware/context';
import Lang from '../langs/home';
import NewsGrid from '../components/news/grid';
import withNews from '../middleware/HOCs/withNews';

const Home = ({ posts }) => {
  const lang = useContext(LangContext);
  return (
    <Layout
      title={Lang.metatitle[lang]}
      description={Lang.description[lang]}
      keywords={Lang.keywords[lang]}
    >
      <div className="app flex justify-between">
        <NewsGrid posts={posts} lang={lang} />
      </div>
    </Layout>
  );
};

Home.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
};

Home.defaultProps = {
  posts: [],
};

export default withNews(Home);
