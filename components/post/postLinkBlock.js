import React from 'react'
import {PostLinkIcon} from '../icons/actions'
import {addNewBlockAt, updateDataOfBlock} from 'Dante2/package/lib/model/index.js'
import 'isomorphic-unfetch'
import NewsCard from '../news/card'

export default class PostLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {post: null}
    console.log('pop', this.defaultData())
  }

  defaultData =()=> {
    let existing_data = this.props.block.getData().toJS()
    return existing_data.embed_data || {}
  }

  updateData = () => {
    const { block, blockProps } = this.props
    const { getEditorState, setEditorState } = blockProps
    const data = block.getData()
    const newData = data.merge(this.state)
    return setEditorState(updateDataOfBlock(getEditorState(), block, newData))
  }

  dataForUpdate =()=> {
    return this.props.blockProps.data.toJS()
  }

  async componentDidMount() {

    if (!this.props.blockProps.data) return
    if (!this.dataForUpdate().endpoint && !this.dataForUpdate().provisory_text) return

    const data = await fetch(this.dataForUpdate().provisory_text, {
      method: 'POST'
    }).then(res => res.json())
    console.log(data)
    if(data.post) this.setState({post: data.post})

  }

  render = ()=> {
    if(this.state.post !== null) {
      return (
        <NewsCard news={this.state.post} lang={'en'} />
      )
    } else {
      return <div></div>
    }
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
