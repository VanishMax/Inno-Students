import React, {useContext, useState, useRef, useEffect} from 'react'
import Router from 'next/router'
import 'isomorphic-unfetch'

import {bucket} from '../constants/user'
import withPost from '../middleware/HOCs/withPost'
import {LangContext} from '../middleware/context'
import Head from '../components/post/head'

import dynamic from 'next/dynamic'
const CoverDialog = dynamic(() => import('../components/post/coverDialog'), {ssr: false})
const PublishDialog = dynamic(() => import('../components/post/publishDialog'), {ssr: false})

import Unexisting from '../components/post/unexisting'
import Actions from '../components/post/actions'
import PostHeader from '../components/post/header'
import Inputs from '../components/post/inputs'

const Post = ({post, role}) => {

  // Dont show the news if there is no news in result or if it is archived
  if(!post || (post.status === 'A' && !role)) {
    return (
      <Unexisting />
    )
  }

  const isAuthor = role === 'A'
  const isEditor = role === 'E'
  const isPublished = post.status === 'P'
  const isExclusive = post.exclusive !== null && post.exclusive !== ''

  const lang = (isAuthor || isEditor) ? useContext(LangContext) : (post.exclusive || useContext(LangContext))

  if(isPublished) {
    useEffect(() => {
      setTimeout(() => {
        fetch('/post/views', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({post: post._id})
        })
      }, 15000)
    }, [])
  }

  // State of the form: title, lead and content
  const [form, editForm] = useState({
    en: {
      title: post.en.title,
      lead: post.en.lead,
      content: post.en.content === '' ? null : JSON.parse(post.en.content),
      textContent: post.en.textContent
    },
    ru: {
      title: post.ru.title,
      lead: post.ru.lead,
      content: post.ru.content === '' ? null : JSON.parse(post.ru.content),
      textContent: post.ru.textContent
    }
  })

  if(!isAuthor && !isEditor) {
    return (
      <React.Fragment>
        <Head lang={lang} post={post} isPublished={isPublished} />

        <div className="content">
          <PostHeader lang={lang} post={post} />
          <Inputs lang={lang} isEdit={false} form={form} post={post._id}
                  titleRef={null} leadRef={null}
                  changeForm={null} changeContent={null} />
        </div>
      </React.Fragment>
    )
  }

  const [isEdit, goToEdit] = useState(false)

  // Control opening informative Snackbar
  const [isSnak, editSnack] = useState(null)
  const changeSnack = (text) => {
    editSnack(text)
    setTimeout(() => changeSnack(null), 3000)
  }


  // Changing news cover and deleting useless images
  const [isCoverOpen, openCover] = useState(false)
  const [images, changeImages] = useState(null)
  const [chosenCover, chooseCover] = useState(null)
  const toggleCover = async () => {
    if(!isCoverOpen) {
      const data = await fetch('/post/images', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({post: post._id})
      }).then(res => res.json())
      if(data.post && data.post.images.length !== 0) {
        changeImages(data.post.images)
        chooseCover(data.post.img)
        openCover(!isCoverOpen)
      } else {
        changeSnack('No images available')
      }
    } else {
      openCover(!isCoverOpen)
    }
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
  const [publishData, editPublishData] = useState(null)
  const togglePublish = async () => {
    if(!isPublishOpen) {
      const data = await fetch('/post/publishData', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({post: post._id})
      }).then(res => res.json())
      editPublishData(data)
    }
    openPublish(!isPublishOpen)
  }

  const publish = async (exclusive) => {
    changeSnack('Publishing. Wait for redirect')
    const data = await fetch('/post/publish', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({post: post._id, exclusive: exclusive})
    }).then(res => res.json())
    togglePublish()
    if(data.url) {
      Router.push({
        pathname: '/post',
        query: {...Router.query, slug: data.url}
      },  '/post/' + data.url)
    }
  }

  // Deletion colors the button in red, an on the second click deletes the post
  const [delTimeout, delChangeTimeout] = useState(null)
  const [isDelete, editDeletion] = useState(false)
  const changeDeletion = (archive) => {
    if(isDelete) {
      if(!archive) {
        fetch('/post/delete', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({post: post._id})
        })
      } else {
        fetch('/post/archive', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({post: post._id})
        })
      }

      Router.replace({
          pathname: Router.pathname,
          query: { lang: Router.query.lang === 'ru' ? 'ru' : null }},
          Router.asPath.match(/lang=ru/) ? '' : Router.asPath + '?lang=ru'
      )
    } else {
      editDeletion(true)
      changeSnack('Click again to ' + (archive ? 'archive' : 'delete'))
      if(delTimeout) clearTimeout(delTimeout)
      delChangeTimeout(setTimeout(() => editDeletion(false), 5000))
    }
  }


  // Refs are passed to contenteditable title and lead inputs
  const titleRef = useRef(null)
  const leadRef = useRef(null)

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

  // Wait until user stop typing and then save data on the server
  const [timeout, changeTimeout] = useState(null)
  const changeForm = (e, name) => {
    editForm({...form, [lang]: {...form[lang], [name]: e.target.value}})

    if(timeout) clearTimeout(timeout)
    changeTimeout(setTimeout(() => save(name, e.target.value), 1000))
  }

  // Change Dante2 content
  const changeContent = (content) => {
    editForm({...form, [lang]: {...form[lang], content: content.emitSerializedOutput()}})

    if(timeout) clearTimeout(timeout)
    changeTimeout(setTimeout(() => {
      if(content !== null) save('content', JSON.stringify(content.emitSerializedOutput()))
      if(content !== null) save('textContent', content.getTextFromEditor())
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
      <Head lang={lang} post={post} isPublished={isPublished} />


      {(isAuthor || isEditor) &&
        <React.Fragment>
          <CoverDialog images={images} isOpen={isCoverOpen} toggle={toggleCover}
                       choose={choose} chosen={chosenCover} del={deleteCover} />

          <PublishDialog post={post} isOpen={isPublishOpen} toggle={togglePublish}
                         lang={lang} data={publishData} publish={publish} />

          <Actions isEdit={isEdit} edit={edit} toggleCover={toggleCover}
                   snack={changeSnack} lang={lang} togglePublish={togglePublish}
                   postID={post._id} sharedWith={post.sharedWith}
                   isPublished={isPublished} isExclusive={isExclusive}
                   isDelete={isDelete} changeDeletion={changeDeletion} />

          <div className={'snackbar ' + (isSnak ? 'show' : '')}>
            {isSnak}
          </div>
        </React.Fragment>
      }

      <div className="content">
        <PostHeader lang={lang} post={post} />
        <Inputs lang={lang} isEdit={isEdit} form={form} post={post._id}
                titleRef={titleRef} leadRef={leadRef}
                changeForm={changeForm} changeContent={changeContent} />
      </div>
    </React.Fragment>
  )
}

export default withPost(Post)
