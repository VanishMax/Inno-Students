import React, {useContext, useState} from 'react'

import isAuthed from '../../middleware/HOCs/isAuthed'
import {LangContext} from '../../middleware/context'
// import Lang from '../../langs/newpost'

import Layout from '../../layouts/user'

const fakeUserImg = '/static/images/fakeUser.jpg'

const NewPost = ({user}) => {
  const lang = useContext(LangContext)

  const bucket = 'http://inno-students.s3.amazonaws.com/'

  return (
    <React.Fragment>
      <Layout lang={lang} title={''}
              img={user.img !== '' ? bucket + user.img : fakeUserImg}
              isAdmin={user.role === "A"}>
        <h1>Hi, world!</h1>
      </Layout>
    </React.Fragment>
  )
}

export default isAuthed(NewPost)
