import React from 'react'
import Lang from '../../langs/profile'

const fakeUser = {
  username: 'petro',
  website: 'example.com',
  img: '/static/images/fakeUser.png',
  en: {
    name: 'Kalivan',
    surname: 'Ivanov'
  },
  ru: {
    name: 'Калыван',
    surname: 'Иванов'
  }
}

export default ({lang, user, goToEdit}) => {

  const locale = user[lang]
  const fakeLocale = fakeUser[lang]

  return (
    <React.Fragment>
      <div className="text-xl text-semibold mb-4 tracking-wider">
        {locale.name || fakeLocale.name} @{user.username || fakeUser.username} {locale.surname || fakeLocale.surname}
      </div>
      <a
        href={'//' + (user.website || fakeUser.website)}
        className="text-lg italic hover:text-green-700 mb-4"
        target="_blank"
      >
        {user.website || fakeUser.website}
      </a>
      <div className="text-xl mb-6">
        {user.role === "A" ? Lang.admin[lang] : Lang.author[lang]}
      </div>
      <div onClick={goToEdit} className="border border-gray-900 cursor-pointer rounded shadow px-4 py-2 hover:border-green-700 hover:text-green-700">
        {Lang.edit[lang]}
      </div>
    </React.Fragment>
  )
}
