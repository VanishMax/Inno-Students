import React, {useContext, useState} from 'react'

import isAuthed from '../../middleware/HOCs/isAuthed'
import {LangContext} from '../../middleware/context'
import NewPostForm from '../../components/post/newPostForm'


const NewPost = ({user}) => {
  const lang = useContext(LangContext)

  return (
    <React.Fragment>
      <NewPostForm lang={lang} user={user} />
    </React.Fragment>
  )
}

export default isAuthed(NewPost)
