import React, {useContext, useState} from 'react'
import Head from 'next/head'

import dynamic from 'next/dynamic'
const Dante = dynamic(
  () => import('Dante2'), {ssr: false}
)

import { ImageBlockConfig } from 'Dante2/package/lib/components/blocks/image.js'
import { VideoBlockConfig } from 'Dante2/package/lib/components/blocks/video.js'
import { DividerBlockConfig } from 'Dante2/package/lib/components/blocks/divider.js'

import withPost from '../middleware/HOCs/withPost'
import {LangContext} from '../middleware/context'
import Lang from '../langs/post'

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
      <div className="content mt-6">
        <Head>
          <title>Not Found</title>
        </Head>
        <div className="block text-4xl">Unexisting post</div>
      </div>
    )
  } else {
    return (
      <React.Fragment>
        <Head>
          <title>{post[lang].title}</title>
        </Head>

        {isAuthor &&
          <div className="mb-4">
            <hr />
            <div className="flex flex-wrap justify-around items-center py-1">
              {isEdit ?
                <div onClick={edit}
                  className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700">
                  Save
                </div>
              :
                <div onClick={edit}
                  className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700">
                  Edit
                </div>
              }

              <div className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700">
                Cover <span className="hidden md:inline">change</span>
              </div>

              {isEdit &&
              <React.Fragment>
                <div
                  className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700">
                  <span className="hidden md:inline">Switch to </span>Russian
                </div>

                <div
                  className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700">
                  <span className="hidden md:inline">Connect to </span>G.Photo
                </div>
              </React.Fragment>
              }

              {!isEdit &&
              <React.Fragment>
                <div className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700">
                  <span className="hidden md:inline">Share with </span>Editors
                </div>

                <br className="fullBrSmall sm:hidden" />

                <div className="border border-green-300 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700">
                  Publish
                </div>

                <div className="border border-red-300 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-red-700 hover:text-red-700">
                  Delete
                </div>
              </React.Fragment>
              }

            </div>
            <hr />
          </div>
        }


        <div className={'snackbar ' + (isSnak ? 'show' : '')}>
          {isSnak}
        </div>


        <div className="content">
          <div className="text-sm text-gray-600">
            <span className="mr-4">{post.author[lang].name + ' ' + post.author[lang].surname}</span>
            <span className="mr-4">{post.tag}</span>
            <span className="mr-4">{post.publishTime || post.creationDate}</span>
            <span className="mr-4">{post.comments.length} {Lang.comments[lang]}</span>
            <span>{post.views || 0} {Lang.views[lang]}</span>
          </div>
          <textarea className="block w-full text-3xl md:text-5xl px-0 overflow-hidden"
                    placeholder={Lang.titlePlaceholder[lang]}  name="title"
                    value={post[lang].title} disabled={!isEdit} rows={1} />
          <input className="block w-full text-2xl text-gray-600" value={post[lang].lead}
                 placeholder={Lang.leadPlaceholder[lang]} name="lead" disabled={!isEdit} />

          <Dante onChange={changeContent} content={content} read_only={!isEdit}
                 widgets={[ImageBlockConfig({ options: { upload_url: '/post/urlll' } }),
                   VideoBlockConfig({ options: { placeholder: 'Put an external video link', endpoint: '//open.iframe.ly/api/oembed?origin=https://github.com&url=', caption: 'optional caption', }, }),
                   DividerBlockConfig()]}/>
        </div>
      </React.Fragment>
    )
  }
}

export default withPost(Post)
