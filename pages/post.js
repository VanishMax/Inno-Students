import React, {useContext, useState} from 'react'
import Head from 'next/head'
import withPost from '../middleware/HOCs/withPost'

import {LangContext} from '../middleware/context'
import Lang from '../langs/post'

import {Edit, Eng, Rus} from '../components/icons/actions'

const Post = ({post, user, isAuthor}) => {

  const lang = useContext(LangContext)
  const [isEdit, goToEdit] = useState(false)
  const [isSnak, changeSnack] = useState(null)

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
            <div className="flex justify-around items-center py-2">
              <div className="flex justify-between">
                {isEdit ?
                  <div onClick={edit}
                    className="border border-gray-200 rounded bg-white text-black py-2 px-4 mr-4 cursor-pointer hover:border-green-700 hover:text-green-700">
                    Save
                  </div>
                :
                  <div onClick={edit}
                    className="border border-gray-200 rounded bg-white text-black py-2 px-4 mr-4 cursor-pointer hover:border-green-700 hover:text-green-700">
                    Edit
                  </div>
                }

                <div className="border border-gray-200 rounded bg-white text-black py-2 px-4 mr-4 cursor-pointer hover:border-green-700 hover:text-green-700">
                  Cover <span className="hidden md:inline">change</span>
                </div>
                {isEdit &&
                  <div className="border border-gray-200 rounded bg-white text-black py-2 px-4 mr-4 cursor-pointer hover:border-green-700 hover:text-green-700">
                    <span className="hidden md:inline">Switch to </span>Russian
                  </div>
                }
                {isEdit &&
                <div className="border border-gray-200 rounded bg-white text-black py-2 px-4 mr-4 cursor-pointer hover:border-green-700 hover:text-green-700">
                  <span className="hidden md:inline">Connect to </span>G.Photo
                </div>
                }
              </div>

              {!isEdit &&
                <div className="flex justify-between">
                  <div className="border border-green-300 rounded bg-white text-black py-2 px-4 mr-4 cursor-pointer hover:border-green-700 hover:text-green-700">
                    Publish
                  </div>
                </div>
              }

              {!isEdit &&
                <div className="flex justify-between">
                  <div className="border border-gray-200 rounded bg-white text-black py-2 px-4 mr-4 cursor-pointer hover:border-green-700 hover:text-green-700">
                    <span className="hidden md:inline">Share with </span>Editors
                  </div>
                  <div className="border border-red-300 rounded bg-white text-black py-2 px-4 mr-4 cursor-pointer hover:border-red-700 hover:text-red-700">
                    Delete
                  </div>
                </div>
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
          <input className="block w-full text-5xl px-0" placeholder={Lang.titlePlaceholder[lang]}
                 value={post[lang].title} name="title" disabled={!isEdit}  />
          <input className="block w-full text-2xl text-gray-600" value={post[lang].lead}
                 placeholder={Lang.leadPlaceholder[lang]} name="lead" disabled={!isEdit} />
        </div>
      </React.Fragment>
    )
  }
}

export default withPost(Post)
