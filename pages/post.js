import React, {useContext, useState} from 'react'
import Head from 'next/head'

import withPost from '../middleware/HOCs/withPost'
import {LangContext} from '../middleware/context'

import Unexisting from '../components/post/unexisting'
import Actions from '../components/post/actions'
import PostHeader from '../components/post/header'
import Inputs from '../components/post/inputs'

const Post = ({post, user, isAuthor}) => {

  const lang = useContext(LangContext)
  const [isEdit, goToEdit] = useState(false)
  const [isSnak, changeSnack] = useState(null)
  const [content, changeDraft] = useState(null)
  const changeContent = (content) => {
    // console.log(content.emitSerializedOutput())
    changeDraft(content.emitSerializedOutput())
  }

  const edit = () => {
    if(isEdit) {
      goToEdit(false)
      changeSnack('You\'ve quitted the editing mode')
      setTimeout(() => changeSnack(null), 5000)
    } else {
      goToEdit(true)
      changeSnack('You\'re now in editing mode')
      setTimeout(() => changeSnack(null), 5000)
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
          <Inputs lang={lang} post={post} isEdit={isEdit} content={content} changeContent={changeContent} />
        </div>
      </React.Fragment>
    )
  }
}

export default withPost(Post)
