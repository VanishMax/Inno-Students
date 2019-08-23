import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-unfetch';

import Dropdown from '../dropdown';
import roles from '../../constants/roles';

const RolesDropdown = ({ user, initialRole }) => {
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
  DropValue.propTypes = {
    index: PropTypes.number.isRequired,
    open: PropTypes.func,
  };
  DropValue.defaultProps = {
    open: null,
  };

  const Opener = ({ open }) => (
    <span>
      <DropValue open={open} index={role.key} />
    </span>
  );
  Opener.propTypes = {
    open: PropTypes.func.isRequired,
  };

  return (
    <React.Fragment>
      {done ? (
        <span className="text-green-700 leading-tight">
          Done
        </span>
      ) : (
        <Dropdown Opener={Opener} size={48} margin={2}>
          <React.Fragment>
            {roles.map(rol => (
              <DropValue index={rol.key} key={rol.key} user={user} />
            ))}
          </React.Fragment>
        </Dropdown>
      )}
    </React.Fragment>
  );
};

RolesDropdown.propTypes = {
  initialRole: PropTypes.string.isRequired,
  user: PropTypes.number,
};

RolesDropdown.defaultProps = {
  user: null,
};

export default RolesDropdown;
