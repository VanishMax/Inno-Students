import React, {useContext, useState} from 'react'

import isAuthed from '../../middleware/HOCs/isAuthed'
import {LangContext} from '../../middleware/context'
// import Lang from '../../langs/newpost'

import Layout from '../../layouts/user'
import Lang from "../../langs/login";
import ErrorLang from "../../langs/authError";

const fakeUserImg = '/static/images/fakeUser.jpg'

const NewPost = ({user}) => {
  const lang = useContext(LangContext)

  const bucket = 'http://inno-students.s3.amazonaws.com/'

  return (
    <React.Fragment>
      <Layout lang={lang} title={''}
              img={user.img !== '' ? bucket + user.img : fakeUserImg}
              isAdmin={user.role === "A"}>
        <form className="w-full max-w-sm mx-auto">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                     htmlFor="title-en">
                Title (EN)
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-300"
                id="title-en" type="text" name="titleEn" placeholder={'New post name'}/>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                     htmlFor="title-ru">
                Title (RU)
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-300"
                id="title-ru" type="text" name="titleRu" placeholder={'Новая новость'}/>
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
              Create
            </button>
          </div>
        </form>
      </Layout>
    </React.Fragment>
  )
}

export default isAuthed(NewPost)
