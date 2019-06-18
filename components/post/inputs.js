import React from 'react'

import Lang from '../../langs/post'
import ContentEditable from 'react-contenteditable'

import dynamic from 'next/dynamic'
const Dante = dynamic(() => import('Dante2'), {ssr: false})
import {ImageBlockConfig} from 'Dante2/package/lib/components/blocks/image'
import {VideoBlockConfig} from 'Dante2/package/lib/components/blocks/video'
import {DividerBlockConfig} from 'Dante2/package/lib/components/blocks/divider'

export default ({lang, changeContent, form, changeForm, isEdit, titleRef, leadRef, clearPlaceholder}) => {
  return (
    <React.Fragment>
      <ContentEditable
        className="block w-full text-3xl md:text-5xl px-0 overflow-hidden focus:outline-none"
        html={form.title}
        disabled={!isEdit}
        onFocus={(e) => clearPlaceholder(e, 'title')}
        onChange={(e) => changeForm(e, 'title')}
        innerRef={titleRef}
      />
      <ContentEditable
        className="block w-full text-xl md:text-xl text-gray-600 overflow-hidden focus:outline-none"
        html={form.lead}
        disabled={!isEdit}
        onFocus={(e) => clearPlaceholder(e, 'lead')}
        onChange={(e) => changeForm(e, 'lead')}
        innerRef={leadRef}
      />

      <Dante onChange={changeContent} content={form.content} read_only={!isEdit}
             widgets={[ImageBlockConfig({ options: { upload_url: '/post/urlll' } }),
               VideoBlockConfig({ options: { placeholder: 'Put an external video link', endpoint: '//open.iframe.ly/api/oembed?origin=https://github.com&url=', caption: 'optional caption', }, }),
               DividerBlockConfig()]}/>
    </React.Fragment>
  )
}
