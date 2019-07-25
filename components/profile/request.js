import React, { useState } from 'react';
import 'isomorphic-unfetch';
import Lang from '../../langs/request';

export default ({ user, lang }) => {
  const [isRequested, changeRequested] = useState(user.request.date !== '');

  const [form, changeForm] = useState({
    alias: '',
    content: '',
    error: null,
  });

  const change = (e) => {
    changeForm({ ...form, [e.target.name]: e.target.value, error: null });
  };

  const submit = async () => {
    if (!form.alias && !form.content) {
      return changeForm({ ...form, error: 2 });
    } if (!form.alias) {
      return changeForm({ ...form, error: 0 });
    } if (!form.content) {
      return changeForm({ ...form, error: 1 });
    } if (form.alias.match(/[^A-Za-z0-9]/)) {
      return changeForm({ ...form, error: 3 });
    }

    const data = await fetch('/user/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: user._id, alias: form.alias, text: form.content }),
    })
      .then((res) => {
        if (res.status !== 400) return res.json();
        return {};
      });
    if (data.message) changeRequested(true);
  };

  return (
    <div className="mb-4">
      <h2 className="text-center text-xl text-semibold tracking-wider">
        {Lang.greet[lang]}
,
        {' '}
        {user.username}
!
      </h2>


      {isRequested
        ? (
          <React.Fragment>
            <p className="mt-6 text-center mx-auto w-full md:w-2/3 lg:1-2">
              {Lang.subtitle2[lang]}
            </p>
          </React.Fragment>
        )
        : (
          <React.Fragment>
            <p className="mt-6 text-center mx-auto w-full md:w-2/3 lg:1-2">
              {Lang.subtitle[lang]}
            </p>
            <form className="mt-8 w-full md:w-2/3 mx-auto">

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                    {Lang.tg[lang]}
                    <span className="text-red-800">*</span>
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-300"
                    type="text"
                    name="alias"
                    maxLength={32}
                    value={form.alias}
                    onChange={change}
                    placeholder={Lang.tgPlaceholder[lang]}
                  />
                </div>
              </div>

              <div className="mb-6 text-center">
                <label className="text-black font-bold md:text-right mb-1 md:mb-0 pr-4">
                  {Lang.why[lang]}
                  <span className="text-red-800">*</span>
                </label>
                <textarea
                  className="w-full border border-gray-200 focus:border-green-200 focus:outline-none p-1"
                  name="content"
                  rows={5}
                  onChange={change}
                  value={form.content}
                />
              </div>

              {form.error !== null
            && (
            <h3 className="mb-4 text-center text-base italic text-red-800">
              {Lang.errors[form.error][lang]}
            </h3>
            )
            }

              <div className="flex items-center justify-center mb-8">
                <button
                  className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={submit}
                >
                  {Lang.create[lang]}
                </button>
              </div>

            </form>
          </React.Fragment>
        )
      }

    </div>
  );
};
