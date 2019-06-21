import React from 'react'

import ContentEditable from 'react-contenteditable'

import dynamic from 'next/dynamic'
const Dante = dynamic(() => import('Dante2'), {ssr: false})
import {ImageBlockConfig} from 'Dante2/package/lib/components/blocks/image'
import {VideoBlockConfig} from 'Dante2/package/lib/components/blocks/video'
import {DividerBlockConfig} from 'Dante2/package/lib/components/blocks/divider'

export default ({lang, post, changeContent, form, changeForm, isEdit, titleRef, leadRef}) => {

  return (
    <React.Fragment>
      <ContentEditable
        className="block w-full text-3xl md:text-5xl px-0 leading-tight overflow-hidden focus:outline-none"
        html={form[lang].title}
        placeholder="Put your title here"
        disabled={!isEdit}
        onChange={(e) => changeForm(e, 'title')}
        innerRef={titleRef}
      />
      <ContentEditable
        className="block w-full text-xl md:text-xl leading-tight text-gray-600 overflow-hidden focus:outline-none"
        html={form[lang].lead}
        disabled={!isEdit}
        placeholder="Put your lead here"
        onChange={(e) => changeForm(e, 'lead')}
        innerRef={leadRef}
      />

        {lang === 'en' ?
          <div  className="mt-6">
            <div />
            <Dante onChange={changeContent} content={form.en.content} read_only={!isEdit}
                   widgets={[ImageBlockConfig({ options: { upload_url: '/post/edit/img?post=' + post } }),
                     VideoBlockConfig({ options: { placeholder: 'Put an external video link', endpoint: '//open.iframe.ly/api/oembed?origin=https://github.com&url=', caption: 'optional caption', }, }),
                     DividerBlockConfig()]} />
          </div>
        :
          <div className="mt-6">
            <Dante onChange={changeContent} content={form.ru.content} read_only={!isEdit}
                   widgets={[ImageBlockConfig({ options: { upload_url: '/post/edit/img?post=' + post } }),
                   VideoBlockConfig({ options: { placeholder: 'Put an external video link', endpoint: '//open.iframe.ly/api/oembed?origin=https://github.com&url=', caption: 'optional caption', }, }),
                   DividerBlockConfig()]} />
          </div>
        }

    </React.Fragment>
  )
}
