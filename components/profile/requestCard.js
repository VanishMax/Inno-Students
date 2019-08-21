import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-unfetch';

const RequestCard = ({ user }) => {
  const [approved, change] = useState(user.request.approved);

  const submit = async () => {
    await fetch('/user/request/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: user._id, role: 'E' }),
    });

    change(true);
  };

  return (
    <div className="rounded shadow w-full md:w-2/3 lg:w-1/2 mt-4 py-2 px-4">
      <h3 className="text-lg text-center">
        {user.username}
        <a className="ml-6 text-blue-500" href={`https://t.me/${user.request.alias}`} target="_blank" rel="noopener noreferrer">
          @
          {user.request.alias}
        </a>
      </h3>
      <p className="my-4">{user.request.text}</p>
      <div className="flex justify-between items-center">
        <span>
          {user.request.date}
        </span>
        <a
          className={`py-2 px-4 rounded text-white bg-${approved ? 'red-500' : 'green-500 cursor-pointer'}`}
          onClick={approved ? null : submit}
        >
          Grant
        </a>
      </div>
    </div>
  );
};

RequestCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.number,
    username: PropTypes.string,
    request: PropTypes.shape({
      approved: PropTypes.bool,
      alias: PropTypes.string,
      date: PropTypes.string,
      text: PropTypes.string,
    }),
  }),
};

RequestCard.defaultProps = {
  user: {},
};

export default RequestCard;
