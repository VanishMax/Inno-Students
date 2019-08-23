import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const Layout = ({
  children, title, description, keywords,
}) => (
  <React.Fragment>
    <Head>
      <title>
        {title}
        &nbsp;| InnoStudents
      </title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="og:image" content="static/images/square.png" />
      <meta name="og:type" content="website" />
    </Head>
    <div className="w-full">
      {children}
    </div>
  </React.Fragment>
);

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
  description: PropTypes.string,
  keywords: PropTypes.string,
};

Layout.defaultProps = {
  children: null,
  description: '',
  keywords: '',
};

export default Layout;
