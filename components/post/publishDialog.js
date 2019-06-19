import React, {useState} from 'react'
import NewsCard from '../news/card'
import {CodesLang} from '../../langs/publish'

export default ({isOpen, toggle, post, lang, data}) => {

  const [langg, changeLangg] = useState(lang)
  const toggleLangg = () => changeLangg(langg === 'ru' ? 'en' : 'ru')

  return (
    <div className={'pt-16 bg-white full-dialog ' + (isOpen ? 'show' : '')}>
      <div onClick={toggle} className="full-dialog-close cursor-pointer">x</div>
      <div onClick={toggleLangg}
           className="full-dialog-lang cursor-pointer">
        {langg.toUpperCase()}
      </div>
      <div className="app flex items-center justify-around flex-wrap flex-col md:flex-row">
        <NewsCard big lang={langg} news={post} />
        <div className="mt-6">
          {data &&
            <React.Fragment>
              {data.codes.map((code, i) => (
                <span key={i} className={`${CodesLang[code].type === 'W' ? 'text-orange-500' : 'text-red-500'}`}>
                  {CodesLang[code][langg]}
                </span>
              ))}
            </React.Fragment>
          }
        </div>
      </div>
    </div>
  )
}
