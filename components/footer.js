import React, {useContext} from 'react'
import Lang from '../langs/header'
import { LangContext } from '../middleware/context'
import Link from './link'

export default () => {
  const lang = useContext(LangContext)
  return (
    <footer className="bg-white footer w-full">
      <div className="flex items-center justify-between py-8 px-4 lg:px-8">
        <div className="flex">
          <Link prefetch href="/">
            <img src="/static/images/headerMini.png" alt="header logo" className="cursor-pointer"/>
          </Link>
        </div>

        <div className="flex justify-between">
          <div className="hidden md:flex">
            <div className="md:mr-12">
              <Link href="/about">
                <a className="header-link">{Lang.about[lang]}</a>
              </Link>
            </div>
            <div className="md:mr-12">
              <Link href="/author">
                <a className="header-link">{Lang.writer[lang]}</a>
              </Link>
            </div>
            <div>
              <Link href="/donate">
                <a className="header-link">{Lang.donate[lang]}</a>
              </Link>
            </div>
          </div>
        </div>


        <div className="flex justify-end">
          <Link href="https://t.me/InnoStudents">
            <a className="mr-2" target="_blank">
              <img src="/static/images/socials/telegram.png"/>
            </a>
          </Link>
          <Link href="https://vk.com/InnoStudents">
            <a className="mr-2" target="_blank">
              <img src="/static/images/socials/vk.png"/>
            </a>
          </Link>
          <Link href="https://instagram.com/InnoStudents">
            <a className="mr-2" target="_blank">
              <img src="/static/images/socials/instagram.png"/>
            </a>
          </Link>
          <Link href="https://facebook.com/InnopolisStudents">
            <a className="mr-2" target="_blank">
              <img src="/static/images/socials/facebook.png"/>
            </a>
          </Link>
          <Link href="https://www.youtube.com/channel/UCwmOq5S4wwmycTgcxUT0-eQ">
            <a target="_blank">
              <img src="/static/images/socials/youtube.png"/>
            </a>
          </Link>
        </div>
      </div>
    </footer>
  )
}
