import React from 'react'
import Lang from "../../langs/login";

export default ({username}) => {

  return (
    <div className="mb-4">
      <h2 className="text-center text-xl text-semibold tracking-wider">Hi, {username}!</h2>
      <p className="mt-6 text-center mx-auto w-full md:w-2/3 lg:1-2">
        You have successfully authorized in InnoStudent with user role. It means
        that you can make a request to become an author. Fill the form below if
        you are interested in it.
      </p>

      <form className="mt-8 w-full max-w-sm mx-auto">

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
              Telegram alias<span className="text-red-800">*</span>
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-300"
              type="text" name="alias" placeholder={'mr.ololoshka'}/>
          </div>
        </div>

        <div className="mb-6 text-center">
          <label className="text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
            Why do you want to become an author?<span className="text-red-800">*</span>
          </label>
          <textarea className="w-full border border-gray-200 focus:border-green-200 focus:outline-none p-1" name="content" rows={5} />
        </div>

        <h3 className="mb-4 text-center text-base italic text-red-800">
          Some error
        </h3>

        <div className="flex items-center justify-center mb-8">
          <button
            className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Create
          </button>
        </div>

      </form>
    </div>
  )
}
