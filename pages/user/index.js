import React, {useContext} from 'react'
import Head from 'next/head'
import isAuthed from '../../middleware/HOCs/isAuthed'
import {LangContext} from '../../middleware/context'
import Link from '../../components/link'
import Lang from '../../langs/profile'

const Profile = ({user}) => {
  const lang = useContext(LangContext)
  return (
    <React.Fragment>
      <Head>
        <title>{Lang.profile[lang]} | InnoStudents</title>
      </Head>
      <div className="app mt-10">

        <div className="flex justify-around items-end">
          <div className="flex justify-center w-1/5">
            <Link href="/">
              <a className="hover:text-green-700">{Lang.myposts[lang]}</a>
            </Link>
          </div>
          <div className="flex justify-center w-1/5">
            <Link href="/">
              <a className="hover:text-green-700">{Lang.newpost[lang]}</a>
            </Link>
          </div>
          <div className="flex justify-center w-1/5">
            <Link href="/">
              <img src="/static/images/square.png" className="avatar user cursor-pointer shadow w-24 h-24" />
            </Link>
          </div>
          <div className="flex justify-center w-1/5">
            <Link href="/">
              <a className="hover:text-green-700">{Lang.drafts[lang]}</a>
            </Link>
          </div>
          <div className="flex justify-center w-1/5">
            <Link href="/user/logout">
              <a className="hover:text-green-700">{Lang.logout[lang]}</a>
            </Link>
          </div>
        </div>

        <hr />

        <div className="flex flex-col items-center justify-center mt-16">
          <div className="text-xl text-semibold mb-4 tracking-wider">Maxim @VanishMax Korsunov</div>
          <a
            href="https://instagram.com/vanishmax"
            className="text-lg italic hover:text-green-700 mb-4"
            target="_blank"
          >
            instagram.com/vanishmax
          </a>
          <div className="text-xl mb-6">
            {user.role === "A" ? Lang.admin[lang] : Lang.author[lang]}
          </div>
          <div className="border border-gray-900 cursor-pointer rounded shadow px-4 py-2 hover:border-green-700 hover:text-green-700">
            {Lang.edit[lang]}
          </div>
        </div>

        {user.role === "A" &&
          <React.Fragment>
            <hr className="mt-24" />
            <div className="flex justify-around items-end">
              <div className="flex justify-center w-1/5">
                <Link href="/">
                  <a className="hover:text-green-700">{Lang.alldrafts[lang]}</a>
                </Link>
              </div>
              <div className="flex justify-center w-1/5">
                <Link href="/">
                  <a className="hover:text-green-700">{Lang.users[lang]}</a>
                </Link>
              </div>
              <div className="flex justify-center w-1/5">
                <Link href="/">
                  <a className="hover:text-green-700">{Lang.messages[lang]}</a>
                </Link>
              </div>
              <div className="flex justify-center w-1/5">
                <Link href="/">
                  <a className="hover:text-green-700">{Lang.stats[lang]}</a>
                </Link>
              </div>
            </div>
          </React.Fragment>
        }
      </div>
    </React.Fragment>
  )
}

export default isAuthed(Profile)
