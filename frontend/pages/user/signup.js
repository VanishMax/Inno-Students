import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import Link from '../../components/link';
import Lang from '../../langs/login';
import ErrorLang from '../../langs/authError';
import withAuthError from '../../middleware/HOCs/withAuthError';
import { LangContext } from '../../middleware/context';

const Signup = ({ message }) => {
  const lang = useContext(LangContext);

  return (
    <div className="w-4/5 md:w-3/5 lg:w-2/5 mx-auto">
      <Head>
        <title>
          {Lang.headSignTitle[lang]}
          &nbsp;| InnoStudents
        </title>
        <meta name="description" content={Lang.headSignDescr[lang]} />
      </Head>
      <h1 className="title">{Lang.titleSign[lang]}</h1>
      <div className="w-full mt-8 p-4 rounded shadow-lg">

        <h3 className="mb-4 text-center text-lg text-base text-gray-800">{Lang.subtitle[lang]}</h3>
        <form className="w-full max-w-sm mx-auto" method="post" action="/user/signup">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="username"
              >
                {Lang.username[lang]}
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-300"
                id="username"
                type="text"
                name="username"
                placeholder={Lang.placeholder[lang]}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="password"
              >
                {Lang.password[lang]}
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-300"
                id="password"
                type="password"
                name="password"
                placeholder="**********"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="confirm"
              >
                {Lang.confirm[lang]}
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-300"
                id="confirm"
                type="password"
                name="confirmPassword"
                placeholder="**********"
              />
            </div>
          </div>
          <h3 className="mb-4 text-center text-base italic text-red-800">
            {lang === 'en' ? message : ErrorLang[message]}
          </h3>
          <div className="flex items-center justify-center">
            <button
              className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
              name="submit"
            >
              {Lang.signButton[lang]}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4 text-center text-lg text-gray-800">
        <h3 className="">{Lang.already[lang]}</h3>
        <Link href="/user/login">
          <a className="hover:text-green-600 italic underline">{Lang.titleLog[lang]}</a>
        </Link>
      </div>
    </div>
  );
};

Signup.propTypes = {
  message: PropTypes.string,
};

Signup.defaultProps = {
  message: '',
};


export default withAuthError(Signup);
