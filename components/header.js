import React, {useContext} from 'react'
import Link from 'next/link'
import Lang from '../langs/header'
import { LangContext } from '../langs/langContext'

export default function Header (props) {
  const lang = useContext(LangContext)
  return (
    <header className="app flex items-center justify-between p-3">

      {/* Large viewport (>1024px) */}
      <div className="hidden lg:flex flex-grow items-center justify-between">
        <div className="flex">
          <Link prefetch href="/">
            <img src="/static/headerMini.png" alt="header logo" className="cursor-pointer"/>
          </Link>
        </div>

        <div className="flex justify-between text-gray-900 no-underline font-semibold text-base text-sm">
          <div className="mr-12">
            <Link prefetch href="/">
              <a className="hover:text-green-800">{Lang.events[lang]}</a>
            </Link>
          </div>
          <div className="mr-12">
            <Link prefetch href="/">
              <a className="hover:text-green-800">{Lang.clubs[lang]}</a>
            </Link>
          </div>
          <div className="mr-12">
            <Link prefetch href="/">
              <a className="hover:text-green-800">{Lang.people[lang]}</a>
            </Link>
          </div>
          <div className="mr-12">
            <Link prefetch href="/">
              <a className="hover:text-green-800">{Lang.campuslife[lang]}</a>
            </Link>
          </div>
          <div>
            <Link prefetch href="/">
              <a className="hover:text-green-800">{Lang.videos[lang]}</a>
            </Link>
          </div>
        </div>

        <div className="flex justify-end">
          <span onClick={props.changeLang} className="mr-8 text-gray-800 font-bold no-underline hover:text-green-800 cursor-pointer">{Lang.lang[lang]}</span>
          <Link href="/login">
            <a className="text-gray-800 font-bold no-underline hover:text-green-800">{Lang.login[lang]}</a>
          </Link>
        </div>
      </div>


      {/* Small viewport (<1024px) */}
      <div className="flex lg:hidden flex-grow items-center justify-between">

        <div className="flex justify-end">
          <Link href="/">
            <span className="cursor-pointer text-base text-gray-800 font-bold no-underline">
              <span onClick={props.changeLang} className="inline lg:hidden font-normal cursor-pointer">{Lang.langSm[lang]}</span>
            </span>
          </Link>
        </div>

        <div className="flex flex-grow justify-center">
          <Link prefetch href="/">
            <img src="/static/headerMini.png" alt="header logo" className="cursor-pointer"/>
          </Link>
        </div>


        <input type="checkbox" id="openMenu"/>

        {/* Menu overlay works only if checkbox is checked after clicking on hamburger */}
        {/* Styles are in the index.css file */}
        <div className="afterChecking">
          <label htmlFor="openMenu" className="openMenu">
            <div className="flex justify-start cursor-pointer">
              <img src="/static/menu.png" alt="menu icon"/>
            </div>
          </label>
          <label htmlFor="openMenu" className="closeMenu">
            <div className="flex justify-start cursor-pointer">
              <img src="/static/close.png" alt="close menu icon"/>
            </div>
          </label>

          <div id="menu" className="pt-4">
            <div className="flex flex-col flex-grow justify-center items-center text-xl no-underline">
              <Link href="/">
                <a className="mb-2">{Lang.events[lang]}</a>
              </Link>
              <Link href="/">
                <a className="mb-2">{Lang.clubs[lang]}</a>
              </Link>
              <Link href="/">
                <a className="mb-2">{Lang.people[lang]}</a>
              </Link>
              <Link href="/">
                <a className="mb-2">{Lang.campuslife[lang]}</a>
              </Link>
              <Link href="/">
                <a className="mb-2">{Lang.videos[lang]}</a>
              </Link>
            </div>

            <hr/>
            <div className="flex flex-col flex-grow justify-center items-center pt-4 text-xl no-underline">
              <Link href="/login">
                <a className="mb-2">{Lang.login[lang]}</a>
              </Link>
              <Link href="/about">
                <a className="mb-2">{Lang.about[lang]}</a>
              </Link>
              <Link href="/writer">
                <a className="mb-2">{Lang.writer[lang]}</a>
              </Link>
              <Link href="/donate">
                <a className="mb-2">{Lang.donate[lang]}</a>
              </Link>
            </div>

            <hr/>
            <div className="flex pt-4 justify-center">
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
        </div>


      </div>
    </header>
  )
}
