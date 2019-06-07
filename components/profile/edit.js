import React, {useState} from 'react'
import 'isomorphic-unfetch'
import Form from './form'

export default ({lang, user, goFromEdit}) => {

  const [form, changeForm] = useState({
    username: user.username || '',
    website: user.website || '',
    enName: user.en.name || '',
    enSurname: user.en.surname || '',
    ruName: user.ru.name || '',
    ruSurname: user.ru.surname || '',
    img: user.img || ''
  })

  const changeVal = e => {
    changeForm({...form, [e.target.name] : e.target.value})
  }

  const submit = async e => {
    e.preventDefault()
    await fetch('/user/edit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...form, _id: user._id})
    })
      .then(res => {
        return res.json()
      })
    goFromEdit()
  }

  return (
    <React.Fragment>
      <Form form={form} lang={lang} change={changeVal} submit={submit} />
    </React.Fragment>
  )
}
