import React, {useContext, useState, useRef} from 'react'
import Head from 'next/head'

import withPost from '../middleware/HOCs/withPost'
import {LangContext} from '../middleware/context'
import Lang from '../langs/post'

import Unexisting from '../components/post/unexisting'
import Actions from '../components/post/actions'
import PostHeader from '../components/post/header'
import Inputs from '../components/post/inputs'

const Post = ({post, user, isAuthor}) => {

  const lang = useContext(LangContext)
  const [isEdit, goToEdit] = useState(false)
  const [isSnak, changeSnack] = useState(null)

  const titleRef = useRef(null)
  const leadRef = useRef(null)

  const [form, editForm] = useState({
    title: post[lang].title || Lang.titlePlaceholder[lang],
    lead: post[lang].lead || Lang.leadPlaceholder[lang],
    content: post[lang].content || null
  })
  const changeForm = (e, name) => {
    editForm({...form, [name]: e.target.value})
  }
  const clearPlaceholder = (e, name) => {
    if(e.target.textContent.indexOf(Lang[name + 'Placeholder'][lang]) !== -1)
      editForm({...form, [name]: ''})
  }
  const changeContent = (content) => {
    // console.log(content.emitSerializedOutput())
    editForm({...form, content: content.emitSerializedOutput()})
  }

  const edit = () => {
    if(isEdit) {
      goToEdit(false)
      changeSnack('You\'ve quitted the editing mode')
      setTimeout(() => changeSnack(null), 3000)
    } else {
      goToEdit(true)
      changeSnack('You\'re now in editing mode')
      setTimeout(() => changeSnack(null), 3000)
    }
  }

  if(!post) {
    return (
      <Unexisting />
    )
  } else {
    return (
      <React.Fragment>
        <Head>
          <title>{post[lang].title}</title>
        </Head>

        {isAuthor &&
          <Actions isEdit={isEdit} edit={edit} />
        }

        <div className={'snackbar ' + (isSnak ? 'show' : '')}>
          {isSnak}
        </div>

        <div className="content">
          <PostHeader lang={lang} post={post} />
          <Inputs lang={lang} isEdit={isEdit} form={form}
                  titleRef={titleRef} leadRef={leadRef} clearPlaceholder={clearPlaceholder}
                  changeForm={changeForm} changeContent={changeContent} />
        </div>
      </React.Fragment>
    )
  }
}

export default withPost(Post)
