import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { LangContext } from '../../middleware/context';
import Layout from '../../layouts/user';
import withData from '../../middleware/HOCs/withData';
import { fakeUserImg, bucket } from '../../constants/user';
import RequestCard from '../../components/profile/requestCard';

const Requests = ({ users, user }) => {
  const lang = useContext(LangContext);

  return (
    <React.Fragment>
      <Layout
        lang={lang}
        title="Requests for authoring"
        img={user.img !== '' ? bucket + user.img : fakeUserImg}
        user={user}
      >
        <React.Fragment>
          {users.map((us, i) => (
            <RequestCard key={i} user={us} />
          ))}
        </React.Fragment>
      </Layout>
    </React.Fragment>
  );
};

Requests.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.shape({
    img: PropTypes.string,
  }),
};

Requests.defaultProps = {
  users: [],
  user: {
    img: '',
  },
};


export default withData(Requests);
