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

export default ({lang, user}) => {

  return (
    <React.Fragment>
      <div className="text-xl text-semibold mb-4 tracking-wider">
        Edit
      </div>
    </React.Fragment>
  )
}
