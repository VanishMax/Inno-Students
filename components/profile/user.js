import React from 'react';
import Lang from '../../langs/profile';

import { fakeUser } from '../../constants/user';

export default ({ lang, user, goToEdit }) => {
  const locale = user[lang];
  const fakeLocale = fakeUser[lang];

  return (
    <React.Fragment>
      <div className="text-xl text-semibold mb-4 tracking-wider">
        <div className="md:hidden mb-4 text-center">
          <span>
            @
            {user.username || fakeUser.username}
          </span>
        </div>
        <div>
          <span className="inline-block mr-4">{locale.name || fakeLocale.name}</span>
          <span className="hidden md:inline-block mr-4">
            @
            {user.username || fakeUser.username}
          </span>
          <span className="inline-block">{locale.surname || fakeLocale.surname}</span>
        </div>
      </div>

      <a
        href={`//${user.website || fakeUser.website}`}
        className="text-lg italic hover:text-green-700 mb-4"
        rel="noopener noreferrer"
        target="_blank"
      >
        {user.website || fakeUser.website}
      </a>
      <div className="text-xl mb-6">
        {user.role === 'A' ? Lang.admin[lang] : Lang.author[lang]}
      </div>
      <div onClick={goToEdit} className="border border-gray-900 cursor-pointer rounded shadow px-4 py-2 hover:border-green-700 hover:text-green-700">
        {Lang.edit[lang]}
      </div>
    </React.Fragment>
  );
};
