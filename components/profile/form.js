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

export default ({lang, form, change, submit}) => {

  return (
    <form onSubmit={submit} className="flex flex-col justify-center w-full md:w-4/5 lg:w-3/5">
      <div className="flex flex-row justify-around mb-4">
        <input
          className="shadow appearance-none border w-3/5 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username" name="username" type="text" onChange={change} placeholder={fakeUser.username} value={form.username || ''} />
      </div>

      <div className="flex flex-row justify-around mb-4">
        <input
          className="shadow appearance-none border w-3/5 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="website" name="website" type="text" onChange={change} placeholder={fakeUser.website} value={form.website || ''} />
      </div>

      <div className="flex flex-row justify-around mb-4">
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="en-name" name="enName" type="text" onChange={change} placeholder={fakeUser.en.name} value={form.enName || ''} />
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="en-surname" name="enSurname" type="text" onChange={change} placeholder={fakeUser.en.surname} value={form.enSurname || ''} />
      </div>

      <div className="flex flex-row justify-around mb-6">
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="ru-name" name="ruName" type="text" onChange={change} placeholder={fakeUser.ru.name} value={form.ruName || ''} />
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="ru-surname" name="ruSurname" type="text" onChange={change} placeholder={fakeUser.ru.surname} value={form.ruSurname || ''} />
      </div>

      <div className="flex justify-center">
        <button
          className="bg-green-400 hover:bg-green-700 w-32 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
          {Lang.save[lang]}
        </button>
      </div>
    </form>
  )
}
