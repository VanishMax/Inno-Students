import React, { useState } from 'react';
import 'isomorphic-unfetch';

import Dropdown from '../dropdown';
import roles from '../../constants/roles';

export default ({ user, initialRole }) => {
  const [role, changeRole] = useState(roles.find(x => x.value === initialRole));
  const [done, changeDone] = useState(false);

  const updateRole = async (rol) => {
    changeRole(rol);
    changeDone(true);

    await fetch('/user/edit/role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: user, role: rol.value }),
    });
  };

  const DropValue = ({ index, open }) => (
    <div
      onClick={() => (open ? open() : updateRole(roles[index]))}
      className={open ? `bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full cursor-pointer
        py-2 px-4 text-gray-700 leading-tight`
        : 'leading-normal tracking-wide border-b-2 border-gray-100 border-solid py-1 cursor-pointer'}
    >
      {roles[index].mean}
    </div>
  );

  const Opener = ({ open }) => (
    <span>
      <DropValue open={open} index={role.key} />
    </span>
  );

  return (
    <React.Fragment>
      {done
        ? (
          <span className="text-green-700 leading-tight">
          Done
          </span>
        )
        : (
          <Dropdown Opener={Opener} size={48} margin={2}>
            {roles.map(rol => (
              <DropValue index={rol.key} key={rol.key} user={user} />
            ))}
          </Dropdown>
        )
      }

    </React.Fragment>
  );
};
