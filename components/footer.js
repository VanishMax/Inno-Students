import React, {useContext} from 'react'
import Lang from '../langs/header'
import { LangContext } from '../middleware/context'
import Link from './link'
import Socials from './socials'

export default () => {
  const lang = useContext(LangContext)
  return (
    <footer className="bg-white footer w-full">
      <div className="flex items-center justify-between py-8 px-4 lg:px-8">
        <div className="flex">
          <Link noPrefetch href="/">
            <img src="/static/images/headerMini.png" alt="header logo" className="cursor-pointer"/>
          </Link>
        </div>

        <div className="flex justify-between">
          <div className="hidden md:flex">
            <div className="md:mr-12">
              <Link noPrefetch href="/about">
                <a className="header-link">{Lang.about[lang]}</a>
              </Link>
            </div>
            <div className="md:mr-12">
              <Link noPrefetch href="/author">
                <a className="header-link">{Lang.writer[lang]}</a>
              </Link>
            </div>
            <div>
              <Link noPrefetch href="/donate">
                <a className="header-link">{Lang.donate[lang]}</a>
              </Link>
            </div>
          </div>
        </div>


        <div className="flex justify-end">
          <Socials size={6} />
        </div>
      </div>
    </footer>
  )
}
