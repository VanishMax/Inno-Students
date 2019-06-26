import React, {useState, useEffect} from 'react'
import {PostLinkIcon} from '../icons/actions'
import {addNewBlockAt} from 'Dante2/package/lib/model/index.js'
import 'isomorphic-unfetch'
import NewsCard from '../news/card'


const PostLink = (props) => {
  const [post, editPost] = useState(null)

  const dataForUpdate = () => {
    return props.blockProps.data.toJS()
  }

  useEffect(() => {
    if (!props.blockProps.data) return
    if (!dataForUpdate().endpoint && !dataForUpdate().provisory_text) return

    const fetchData = async (url) => {
      const data = await fetch(url, {
        method: 'POST'
      }).then(res => res.json())
      if(data.post) editPost(data.post)
    }

    fetchData(dataForUpdate().provisory_text)

  }, [])

  if(post !== null) {
    return (
      <NewsCard news={post} lang={'en'} />
    )
  } else {
    return <div />
  }
}

export const PostLinkBlockConfig = (options={})=>{

  let config = {
    title: 'add link to the post',
    editable: true,
    type: 'post-link',
    icon: PostLinkIcon,
    block: PostLink,
    renderable: true,
    breakOnContinuous: true,
    wrapper_class: "post-link",
    selected_class: " is-selected is-mediaFocused",
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "placeholder",
      insert_block: "post-link"
    },
    options: {
      endpoint: '//noembed.com/embed?url=',
      placeholder: 'Paste a link to a InnoStudents post',
      caption: 'Type caption for embed (optional)'
    },

    handleEnterWithoutText(ctx, block) {
      const { editorState } = ctx.state
      return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
    },

    handleEnterWithText(ctx, block) {
      const { editorState } = ctx.state
      return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
    }
  }

  return Object.assign(config, options)
}
