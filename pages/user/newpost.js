import React, {useContext, useState} from 'react'

import isAuthed from '../../middleware/HOCs/isAuthed'
import {LangContext} from '../../middleware/context'
import NewPostForm from '../../components/post/newPostForm'


const NewPost = ({user}) => {
  const lang = useContext(LangContext)

  const [form, changeForm] = useState({
    titleEn: '',
    titleRu: '',
    tag: 0
  })

  const changeTitle = e => {
    changeForm({...form, [e.target.name] : e.target.value})
  }

  const changeTag = index => {
    changeForm({...form, tag: index})
  }

  return (
    <React.Fragment>
      <NewPostForm lang={lang} user={user} form={form} changeTitle={changeTitle} changeTag={changeTag} />
    </React.Fragment>
  )
}

export default isAuthed(NewPost)
