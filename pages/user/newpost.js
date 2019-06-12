import React, {useContext, useState} from 'react'
import 'isomorphic-unfetch'

import isAuthed from '../../middleware/HOCs/isAuthed'
import {LangContext} from '../../middleware/context'
import NewPostForm from '../../components/post/newPostForm'
import tags from '../../constants/tags'

const NewPost = ({user}) => {
  const lang = useContext(LangContext)

  const [form, changeForm] = useState({
    titleEn: '',
    titleRu: '',
    error: null,
    tag: 0
  })

  const changeTitle = e => {
    changeForm({...form, [e.target.name] : e.target.value, error: null})
  }

  const changeTag = index => {
    changeForm({...form, tag: index})
  }

  const submit = async () => {
    if(!form.titleEn && !form.titleRu) {
      return changeForm({...form, error: 0})
    } else if(!form.titleEn) {
      return changeForm({...form, error: 1})
    } else if(!form.titleRu) {
      return changeForm({...form, error: 2})
    }

    const data = await fetch('/post/new', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user: user._id, titleEn: form.titleEn, titleRu: form.titleRu, tag: tags[form.tag]})
    })
      .then(res => {
        return res.json()
      })
    console.log(data)
  }

  return (
    <React.Fragment>
      <NewPostForm lang={lang} user={user} form={form}
                   changeTitle={changeTitle} changeTag={changeTag}
                   submit={submit} tags={tags} />
    </React.Fragment>
  )
}

export default isAuthed(NewPost)
