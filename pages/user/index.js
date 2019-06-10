import React, {useContext, useState} from 'react'
import Router from 'next/router'
import isAuthed from '../../middleware/HOCs/isAuthed'
import {LangContext} from '../../middleware/context'
import Lang from '../../langs/profile'

import Layout from '../../layouts/user'
import User from '../../components/profile/user'
import Edit from '../../components/profile/edit'

const fakeUserImg = '/static/images/fakeUser.jpg'

const Profile = ({user}) => {
  const lang = useContext(LangContext)

  const [isEdit, changeEdit] = useState(false)
  const goToEdit = () => changeEdit(true)
  const goFromEdit = () => {
    Router.replace({ pathname: Router.pathname, query: { ...Router.query }})
    changeEdit(false)
  }

  const bucket = 'http://inno-students.s3.amazonaws.com/'

  return (
    <React.Fragment>
      <Layout lang={lang} title={Lang.profile[lang]}
              img={user.img !== '' ? bucket + user.img : fakeUserImg}
              goFromEdit={goFromEdit} isAdmin={user.role === "A"}
      >
        {isEdit ?
          <Edit lang={lang} user={user} goFromEdit={goFromEdit} />
          :
          <User lang={lang} user={user} goToEdit={goToEdit} />
        }
      </Layout>
    </React.Fragment>
  )
}

export default isAuthed(Profile)
