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
          className="shadow appearance-none border w-3/5 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border focus:border-green-700"
          id="username" name="username" type="text" onChange={change} placeholder={fakeUser.username} value={form.username || ''} />
      </div>

      <div className="flex flex-row justify-around mb-4">
        <input
          className="shadow appearance-none border w-3/5 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border focus:border-green-700"
          id="website" name="website" type="text" onChange={change} placeholder={fakeUser.website} value={form.website || ''} />
      </div>

      <div className="flex flex-row justify-around mb-4">
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:border focus:border-green-700"
          id="en-name" name="enName" type="text" onChange={change} placeholder={fakeUser.en.name} value={form.enName || ''} />
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border focus:border-green-700"
          id="en-surname" name="enSurname" type="text" onChange={change} placeholder={fakeUser.en.surname} value={form.enSurname || ''} />
      </div>

      <div className="flex flex-row justify-around mb-4">
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:border focus:border-green-700"
          id="ru-name" name="ruName" type="text" onChange={change} placeholder={fakeUser.ru.name} value={form.ruName || ''} />
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border focus:border-green-700"
          id="ru-surname" name="ruSurname" type="text" onChange={change} placeholder={fakeUser.ru.surname} value={form.ruSurname || ''} />
      </div>

      <div className="flex flex-row justify-around mb-6">
        <div className="flex w-full items-center justify-center bg-grey-lighter">
          <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-green-700">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"/>
            </svg>
            <span className="mt-2 text-base leading-normal">Select an image</span>
            <input type="file" className="hidden" accept="image/*"/>
          </label>
        </div>
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
