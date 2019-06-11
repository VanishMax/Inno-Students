import React from 'react'
import Lang from '../../langs/newpost'
import Layout from '../../layouts/user'

const fakeUserImg = '/static/images/fakeUser.jpg'
const bucket = 'http://inno-students.s3.amazonaws.com/'

export default ({lang, user}) => {
  return(
    <Layout lang={lang} title={Lang.metatitle[lang]}
            img={user.img !== '' ? bucket + user.img : fakeUserImg}
            isAdmin={user.role === "A"}>
      <form className="w-full max-w-sm mx-auto">

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <span className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4">
              {Lang.titleEn[lang]}
            </span>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-300"
              type="text" autoComplete="off"
              name="titleEn" placeholder="Name of the post" />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <span className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4">
              {Lang.titleRU[lang]}
            </span>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-300"
              type="text" autoComplete="off"
              name="titleRu" placeholder="Название нового поста" />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <span className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4">
              {Lang.tag[lang]}
            </span>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-300"
              type="text" autoComplete="off"
              name="titleRu" placeholder="Название нового поста" />
          </div>
        </div>

        <h3 className="mb-4 text-center text-base italic text-red-800">
          Some error
        </h3>

        <div className="flex items-center justify-center">
          <button
            className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit" name="submit"
          >
            {Lang.create[lang]}
          </button>
        </div>
      </form>
    </Layout>
  )
}
