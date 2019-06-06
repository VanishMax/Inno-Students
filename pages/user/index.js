import React, {useContext} from 'react'
import Head from 'next/head'
import isAuthed from '../../middleware/HOCs/isAuthed'
import {LangContext} from '../../middleware/context'
import Lang from '../../langs/profile'

import AdminNav from '../../components/profile/adminNav'
import MainNav from '../../components/profile/mainNav'
import User from '../../components/profile/user'

const Profile = ({user}) => {
  const lang = useContext(LangContext)
  return (
    <React.Fragment>
      <Head>
        <title>{Lang.profile[lang]} | InnoStudents</title>
      </Head>
      <div className="app mt-10">

        <MainNav lang={lang} />

        <div className="flex flex-col items-center justify-center mt-16">
          <User lang={lang} user={user} />
        </div>

        {user.role === "A" &&
          <AdminNav lang={lang} />
        }
      </div>
    </React.Fragment>
  )
}

export default isAuthed(Profile)
