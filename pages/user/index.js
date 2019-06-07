import React, {useContext, useState} from 'react'
import Router from 'next/router'
import Head from 'next/head'
import isAuthed from '../../middleware/HOCs/isAuthed'
import {LangContext} from '../../middleware/context'
import Lang from '../../langs/profile'

import AdminNav from '../../components/profile/adminNav'
import MainNav from '../../components/profile/mainNav'
import User from '../../components/profile/user'
import Edit from '../../components/profile/edit'

const fakeUserImg = '/static/images/fakeUser.png'

const Profile = ({user}) => {
  const lang = useContext(LangContext)

  const [isEdit, changeEdit] = useState(false)
  const goToEdit = () => changeEdit(true)
  const goFromEdit = () => {
    Router.replace({ pathname: Router.pathname, query: { ...Router.query }})
    changeEdit(false)
  }

  return (
    <React.Fragment>
      <Head>
        <title>{Lang.profile[lang]} | InnoStudents</title>
      </Head>
      <div className="app mt-10">

        <MainNav lang={lang} img={user.img || fakeUserImg} goFromEdit={goFromEdit} />

        <div className="flex flex-col items-center justify-center mt-16">
          {isEdit ?
            <Edit lang={lang} user={user} goFromEdit={goFromEdit} />
          :
            <User lang={lang} user={user} goToEdit={goToEdit} />
          }
        </div>

        {user.role === "A" &&
          <AdminNav lang={lang} />
        }
      </div>
    </React.Fragment>
  )
}

export default isAuthed(Profile)
