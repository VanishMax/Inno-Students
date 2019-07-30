import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { LangContext } from '../../middleware/context';
import Layout from '../../layouts/user';
import withData from '../../middleware/HOCs/withData';
import { fakeUserImg, bucket } from '../../constants/user';
import PostsTable from '../../components/post/postsTable';

const Drafts = ({ posts, user }) => {
  const lang = useContext(LangContext);

  return (
    <React.Fragment>
      <Layout
        lang={lang}
        title="Your Drafts"
        img={user.img !== '' ? bucket + user.img : fakeUserImg}
        user={user}
      >
        <PostsTable posts={posts} lang={lang} authors />
      </Layout>
    </React.Fragment>
  );
};

Drafts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.shape({
    img: PropTypes.string,
  }),
};

Drafts.defaultProps = {
  user: {},
  posts: [],
};

export default withData(Drafts);
