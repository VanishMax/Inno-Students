import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { LangContext } from '../../middleware/context';
import Layout from '../../layouts/user';
import withData from '../../middleware/HOCs/withData';
import { fakeUserImg, bucket } from '../../constants/user';
import UsersTable from '../../components/profile/usersTable';

const Users = ({ users, user }) => {
  const lang = useContext(LangContext);

  return (
    <React.Fragment>
      <Layout
        lang={lang}
        title="All Users"
        img={user.img !== '' ? bucket + user.img : fakeUserImg}
        user={user}
      >
        <UsersTable users={users} lang={lang} />
      </Layout>
    </React.Fragment>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.shape({
    img: PropTypes.string,
  }),
};

Users.defaultProps = {
  users: [],
  user: {
    img: '',
  },
};

export default withData(Users);
