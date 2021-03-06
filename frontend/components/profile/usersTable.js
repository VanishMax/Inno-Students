import React from 'react';
import PropTypes from 'prop-types';
import RolesDropdown from './rolesDropdown';

const UsersTable = ({ users, lang }) => (
  <div className="w-full md:w-2/3 mx-auto">
    <div className="bg-white shadow-md rounded my-6">
      <table className="text-left w-full border-collapse">
        <thead className="font-bold uppercase text-sm text-grey-dark">
          <tr>
            <th className="py-4 px-2 md:px-6  border-b border-grey-light">
              #
            </th>
            <th className="py-4 px-2 md:px-6 border-b border-grey-light">
              Username
            </th>
            <th className="py-4 px-2 md:px-6 border-b border-grey-light">
              Full name
            </th>
            <th className="py-4 px-2 md:px-6 border-b border-grey-light">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i} className="hover:bg-gray-100">
              <td className="py-4 px-2 md:px-6 border-b border-gray-100">
                {i}
              </td>
              <td className="py-4 px-2 md:px-6 border-b border-gray-100">
                {user.username}
              </td>
              <td className="py-4 px-2 md:px-6 border-b border-gray-100">
                {`${user[lang].name} ${user[lang].surname}`}
              </td>
              <td className="py-4 px-2 md:px-6 border-b border-gray-100">
                <RolesDropdown user={user._id} initialRole={user.role} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

UsersTable.propTypes = {
  lang: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
};

UsersTable.defaultProps = {
  users: [],
};

export default UsersTable;
