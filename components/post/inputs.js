import React from 'react'

import Lang from '../../langs/post'

import dynamic from 'next/dynamic'
const Dante = dynamic(
  () => import('Dante2'), {ssr: false}
)

import {ImageBlockConfig} from 'Dante2/package/lib/components/blocks/image'
import {VideoBlockConfig} from 'Dante2/package/lib/components/blocks/video'
import {DividerBlockConfig} from 'Dante2/package/lib/components/blocks/divider'

export default ({lang, post, changeContent, content, isEdit}) => {
  return (
    <React.Fragment>
      <textarea className="block w-full text-3xl md:text-5xl px-0 overflow-hidden"
                placeholder={Lang.titlePlaceholder[lang]}  name="title"
                value={post[lang].title} disabled={!isEdit} rows={1} />
      <textarea className="block w-full text-xl md:text-xl text-gray-600"
                value={post[lang].lead} rows={1} name="lead"
                placeholder={Lang.leadPlaceholder[lang]} disabled={!isEdit} />

      <Dante onChange={changeContent} content={content} read_only={!isEdit}
             widgets={[ImageBlockConfig({ options: { upload_url: '/post/urlll' } }),
               VideoBlockConfig({ options: { placeholder: 'Put an external video link', endpoint: '//open.iframe.ly/api/oembed?origin=https://github.com&url=', caption: 'optional caption', }, }),
               DividerBlockConfig()]}/>
    </React.Fragment>
  )
}
