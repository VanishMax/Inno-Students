import React from 'react'
import NewsCard from '../news/card'

export default ({isOpen, toggle, post, lang}) => {
  return (
    <div className={'pt-8 bg-white full-dialog ' + (isOpen ? 'show' : '')}>
      <div onClick={toggle} className="full-dialog-close cursor-pointer">x</div>
      <div className="app flex items-center justify-around flex-wrap flex-col md:flex-row">
        <NewsCard big lang={lang} news={post} />
      </div>
    </div>
  )
}
