import React, {useContext} from 'react'
import Lang from '../langs/header'
import { LangContext } from '../middleware/context'
import Link from '../components/Link'

export default () => {
  const lang = useContext(LangContext)
  return (
    <footer className="bg-white footer w-full">
      <div className="flex items-center justify-between py-8 px-4 lg:px-8">
        <div className="flex">
          <Link prefetch href="/">
            <img src="/static/headerMini.png" alt="header logo" className="cursor-pointer"/>
          </Link>
        </div>

        <div className="flex justify-between text-gray-900 no-underline font-semibold text-base text-sm">
          <div className="hidden sm:flex">
            <div className="mr-8 md:mr-12">
              <Link prefetch href="/about">
                <a className="hover:text-green-800">{Lang.about[lang]}</a>
              </Link>
            </div>
            <div className="mr-8 md:mr-12">
              <Link prefetch href="/writer">
                <a className="hover:text-green-800">{Lang.writer[lang]}</a>
              </Link>
            </div>
            <div>
              <Link prefetch href="/donate">
                <a className="hover:text-green-800">{Lang.donate[lang]}</a>
              </Link>
            </div>
          </div>
        </div>


        <div className="flex justify-end">
          <Link href="https://t.me/InnoStudents">
            <a className="mr-2" target="_blank">
              <img src="/static/socials/telegram.png"/>
            </a>
          </Link>
          <Link href="https://vk.com/InnoStudents">
            <a className="mr-2" target="_blank">
              <img src="/static/socials/vk.png"/>
            </a>
          </Link>
          <Link href="https://instagram.com/InnoStudents">
            <a className="mr-2" target="_blank">
              <img src="/static/socials/instagram.png"/>
            </a>
          </Link>
          <Link href="https://facebook.com/InnopolisStudents">
            <a className="mr-2" target="_blank">
              <img src="/static/socials/facebook.png"/>
            </a>
          </Link>
          <Link href="https://www.youtube.com/channel/UCwmOq5S4wwmycTgcxUT0-eQ">
            <a target="_blank">
              <img src="/static/socials/youtube.png"/>
            </a>
          </Link>
        </div>
      </div>
    </footer>
  )
}
