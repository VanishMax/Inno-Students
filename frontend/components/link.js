import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { LangContext } from '../middleware/context';

function MyLink({
  children, href, as = href, query, prefetch,
}) {
  const lang = useContext(LangContext);
  const langQuery = lang === 'ru' ? '?lang=ru' : '';

  return (
    <Link prefetch={prefetch} href={{ pathname: href, query: { ...query } }} as={as + langQuery}>
      {children}
    </Link>
  );
}

MyLink.propTypes = {
  href: PropTypes.string,
  // eslint-disable-next-line
  as: PropTypes.string,
  query: PropTypes.shape(),
  children: PropTypes.element,
  prefetch: PropTypes.bool,
};

MyLink.defaultProps = {
  href: '/',
  query: {},
  children: null,
  prefetch: false,
};

export default withRouter(MyLink);
