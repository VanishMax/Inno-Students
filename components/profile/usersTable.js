import React from 'react'
import Dropdown from '../dropdown'

export default ({users, lang, roles, role, changeRole}) => {

  const DropValue = ({index, open}) => {
    return (
      <div
        onClick={() => open ? open() : changeRole(roles[index])}
        className={open ? `bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full cursor-pointer
        py-2 px-4 text-gray-700 leading-tight`
          : 'leading-normal tracking-wide border-b-2 border-gray-100 border-solid py-1 cursor-pointer'}
      >
        {roles[index].mean}
      </div>
    )
  }

  const Opener = ({open}) => (
    <span>
      <DropValue open={open} index={role.key}/>
    </span>
  )


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
                <Dropdown Opener={Opener} size={48} margin={2}>
                  {roles.map(rol => (
                    <DropValue index={rol.key} key={rol.key} />
                  ))}
                </Dropdown>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
