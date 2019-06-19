import React, {useContext, useState, useRef} from 'react'
import Router from 'next/router'
import Head from 'next/head'
import {bucket} from '../constants/user'
import 'isomorphic-unfetch'

import withPost from '../middleware/HOCs/withPost'
import {LangContext} from '../middleware/context'
import Lang from '../langs/post'

import dynamic from 'next/dynamic'
const CoverDialog = dynamic(() => import('../components/post/coverDialog'), {ssr: false})
const PublishDialog = dynamic(() => import('../components/post/publishDialog'), {ssr: false})

import Unexisting from '../components/post/unexisting'
import Actions from '../components/post/actions'
import PostHeader from '../components/post/header'
import Inputs from '../components/post/inputs'

const Post = ({post, user, role}) => {

  if(!post) {
    return (
      <Unexisting />
    )
  }

  const lang = useContext(LangContext)

  const isAuthor = role === 'A'
  const isEditor = role === 'E'

  const [isEdit, goToEdit] = useState(false)

  // Control opening informative Snackbar
  const [isSnak, editSnack] = useState(null)
  const changeSnack = (text) => {
    editSnack(text)
    setTimeout(() => changeSnack(null), 3000)
  }


  // Changing news cover and deleting useless images
  const [isCoverOpen, openCover] = useState(false)
  const [images, changeImages] = useState(post.images)
  const [chosenCover, chooseCover] = useState(post.img)
  const toggleCover = () => {
    openCover(!isCoverOpen)
  }
  const choose = (img) => {
    fetch('/post/edit/changeCover', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({img: img, post: post._id})
    })
    chooseCover(img)
    changeSnack('You\'ve changed the cover image')
  }
  const deleteCover = (e, img) => {
    e.stopPropagation()
    fetch(bucket + img, {
      method: 'DELETE'
    })
    fetch('/post/edit/imgRemove', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({img: img, post: post._id})
    })
    changeSnack('Image deleted')
    changeImages(images.filter(x => x !== img))
  }


  // Before publishing we have to show the statistics dialog
  const [isPublishOpen, openPublish] = useState(false)
  const togglePublish = () => {
    openPublish(!isPublishOpen)
  }

  // Deletion colors the button in red, an on the second click deletes the post
  const [delTimeout, delChangeTimeout] = useState(null)
  const [isDelete, editDeletion] = useState(false)
  const changeDeletion = () => {
    if(isDelete) {
      fetch('/post/delete', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({post: post._id})
      })
      Router.replace({
          pathname: Router.pathname,
          query: { lang: Router.query.lang === 'ru' ? 'ru' : null }},
          Router.asPath.match(/lang=ru/) ? '' : Router.asPath + '?lang=ru'
      )
    } else {
      editDeletion(true)
      changeSnack('Click again to delete')
      if(delTimeout) clearTimeout(delTimeout)
      delChangeTimeout(setTimeout(() => editDeletion(false), 5000))
    }
  }


  // Refs are passed to contenteditable title and lead inputs
  const titleRef = useRef(null)
  const leadRef = useRef(null)

  // State of the form: title, lead and content
  const [form, editForm] = useState({
    title: post[lang].title || Lang.titlePlaceholder[lang],
    lead: post[lang].lead || Lang.leadPlaceholder[lang],
    content: post[lang].content === '' ? null : JSON.parse(post[lang].content)
  })

  // Change read_only to edit mode
  const edit = () => {
    if(isEdit) {
      goToEdit(false)
      changeSnack('You\'ve quitted the editing mode')
    } else {
      goToEdit(true)
      changeSnack('You\'re now in editing mode')
    }
  }

  // Contenteditable does not provide a placeholder, so create ours
  const clearPlaceholder = (e, name) => {
    if(e.target.textContent.indexOf(Lang[name + 'Placeholder'][lang]) !== -1)
      editForm({...form, [name]: ''})
  }

  // Wait until user stop typing and then save data on the server
  const [timeout, changeTimeout] = useState(null)
  const changeForm = (e, name) => {
    editForm({...form, [name]: e.target.value})

    if(timeout) clearTimeout(timeout)
    changeTimeout(setTimeout(() => save(name, e.target.value), 1000))
  }

  // Change Dante2 content
  const changeContent = (content) => {
    editForm({...form, content: content.emitSerializedOutput()})

    if(timeout) clearTimeout(timeout)
    changeTimeout(setTimeout(() => {
      if(content !== null) save('content', JSON.stringify(content.emitSerializedOutput()))
    }, 1000))
  }

  // Save by name of the field and the language (flexible)
  const save = async (name, value) => {
    return await fetch('/post/edit/text', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({lang: lang, post: post._id, [name]: value, name: name})
    }).then(res => res.json())
  }


    return (
      <React.Fragment>
        <Head>
          <title>{post[lang].title}</title>
        </Head>


        {(isAuthor || isEditor) &&
          <React.Fragment>
            <CoverDialog images={images} isOpen={isCoverOpen} toggle={toggleCover}
                         choose={choose} chosen={chosenCover} del={deleteCover} />

            <PublishDialog post={post} isOpen={isPublishOpen} toggle={togglePublish} lang={lang}/>

            <Actions isEdit={isEdit} edit={edit} toggleCover={toggleCover}
                     snack={changeSnack} lang={lang} togglePublish={togglePublish}
                     postID={post._id} sharedWith={post.sharedWith}
                     isDelete={isDelete} changeDeletion={changeDeletion} />

            <div className={'snackbar ' + (isSnak ? 'show' : '')}>
              {isSnak}
            </div>
          </React.Fragment>
        }

        <div className="content">
          <PostHeader lang={lang} post={post} />
          <Inputs lang={lang} isEdit={isEdit} form={form} post={post._id}
                  titleRef={titleRef} leadRef={leadRef} clearPlaceholder={clearPlaceholder}
                  changeForm={changeForm} changeContent={changeContent} />
        </div>
      </React.Fragment>
    )
}

export default withPost(Post)
