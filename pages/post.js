import React, {useContext} from 'react'
import Head from 'next/head'
import withPost from '../middleware/HOCs/withPost'

import {LangContext} from '../middleware/context'
import Lang from '../langs/post'

import {Edit, Eng, Rus} from '../components/icons/actions'

const Post = ({post, user, isAuthor}) => {

  const lang = useContext(LangContext)


  if(!post) {
    return (
      <div className="content">
        <div className="block text-5xl">Unexisting post</div>
      </div>
    )
  } else {
    return (
      <React.Fragment>
        <Head>
          <title>{post[lang].title}</title>
        </Head>
        <div className="post-actions">
          <Edit />
          {lang === 'ru' ?
            <Rus />
          :
            <Eng />
          }
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
                 value={post[lang].title} name="title" disabled />
          <input className="block w-full text-2xl text-gray-600" value={post[lang].lead}
                 placeholder={Lang.leadPlaceholder[lang]} name="lead" disabled />
        </div>
      </React.Fragment>
    )
  }
}

export default withPost(Post)
