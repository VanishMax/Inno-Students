import React from 'react'

export default ({users, lang}) => {

  return (
    <div className="w-full md:w-2/3 mx-auto">
      <div className="bg-white shadow-md rounded my-6">
        <table className="text-left w-full border-collapse">
          <thead className="font-bold uppercase text-sm text-grey-dark">
          <tr>
            <th className="py-4 px-6  border-b border-grey-light">
              #
            </th>
            <th className="py-4 px-6 border-b border-grey-light">
              Username
            </th>
            <th className="py-4 px-6 border-b border-grey-light">
              Full name
            </th>
            <th className="py-4 px-6 border-b border-grey-light">
              Role
            </th>
          </tr>
          </thead>
          <tbody>
          {users.map((user, i) =>
            <tr key={i} className="hover:bg-gray-100">
              <td className="py-4 px-6 border-b border-gray-100">
                {i}
              </td>
              <td className="py-4 px-6 border-b border-gray-100">
                {user.username}
              </td>
              <td className="py-4 px-6 border-b border-gray-100">
                {user[lang].name + ' ' + user[lang].surname}
              </td>
              <td className="py-4 px-6 border-b border-gray-100">
                {user.role}
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
