import React from 'react';
import Router from 'next/router';
import Head from 'next/head';
import PropTypes from 'prop-types';

import AdminNav from '../components/profile/adminNav';
import MainNav from '../components/profile/mainNav';
import Request from '../components/profile/request';

const Layout = ({
  children, lang, img, goFromEdit, title, user,
}) => {
  if (!goFromEdit) {
    // eslint-disable-next-line
    goFromEdit = () => {
      Router.replace({ pathname: '/user', query: { ...Router.query } });
    };
  }

  return (
    <React.Fragment>
      <Head>
        <title>
          {title}
          &nbsp;| InnoStudents
        </title>
      </Head>
      <div className="app mt-10">
        {user.role === 'A' || user.role === 'E' ? (
          <React.Fragment>
            <MainNav lang={lang} img={img} goFromEdit={goFromEdit} />

            <div className="flex flex-col items-center justify-center mt-16">
              { children }
            </div>

            { user.role === 'A' && <AdminNav lang={lang} /> }
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Request user={user} lang={lang} />
          </React.Fragment>
        )}
      </div>
    </React.Fragment>

  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  children: PropTypes.element,
  img: PropTypes.string,
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
  goFromEdit: PropTypes.func,
};

Layout.defaultProps = {
  children: null,
  img: '',
  user: {
    role: 'U',
  },
  goFromEdit: null,
};

export default Layout;
