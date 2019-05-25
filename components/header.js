import React from 'react'
import Link from 'next/link'

export default function Header () {
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
              <a className="hover:text-green-800">Events</a>
            </Link>
          </div>
          <div className="mr-12">
            <Link prefetch href="/">
              <a className="hover:text-green-800">Clubs</a>
            </Link>
          </div>
          <div className="mr-12">
            <Link prefetch href="/">
              <a className="hover:text-green-800">People</a>
            </Link>
          </div>
          <div className="mr-12">
            <Link prefetch href="/">
              <a className="hover:text-green-800">Campus life</a>
            </Link>
          </div>
          <div>
            <Link prefetch href="/">
              <a className="hover:text-green-800">Videos</a>
            </Link>
          </div>
        </div>

        <div className="flex justify-end">
          <Link href="/">
            <a className="mr-8 text-gray-800 font-bold no-underline hover:text-green-800">English</a>
          </Link>
          <Link href="/login">
            <a className="text-gray-800 font-bold no-underline hover:text-green-800">Log In</a>
          </Link>
        </div>
      </div>

      {/* Small viewport (<1024px) */}
      <div className="flex lg:hidden flex-grow items-center justify-between">
        <input type="checkbox" id="openMenu"/>

        {/* Menu overlay works only if checkbox is checked after clicking on hamburger */}
        {/* Styles are in the index.css file */}
        <div id="menu" className="pt-24">
          <div className="flex flex-col flex-grow justify-center items-center">
            <Link href="/">
              <a className="text-xl mb-2 text-gray-800 hover:text-green-800 font-bold no-underline">Events</a>
            </Link>
            <Link href="/">
              <a className="text-xl mb-2 text-gray-800 hover:text-green-800 font-bold no-underline">Clubs</a>
            </Link>
            <Link href="/">
              <a className="text-xl mb-2 text-gray-800 hover:text-green-800 font-bold no-underline">People</a>
            </Link>
            <Link href="/">
              <a className="text-xl mb-2 text-gray-800 hover:text-green-800 font-bold no-underline">Campus Life</a>
            </Link>
            <Link href="/">
              <a className="text-xl mb-2 text-gray-800 hover:text-green-800 font-bold no-underline">Videos</a>
            </Link>
          </div>

          <hr/>
          <div className="flex flex-col flex-grow justify-center items-center pt-4">
            <Link href="/login">
              <a className="text-xl mb-2 text-gray-800 hover:text-green-800 font-bold no-underline">Log In</a>
            </Link>
            <Link href="/about">
              <a className="text-xl mb-2 text-gray-800 hover:text-green-800 font-bold no-underline">About Us</a>
            </Link>
            <Link href="/writer">
              <a className="text-xl mb-2 text-gray-800 hover:text-green-800 font-bold no-underline">Become a writer</a>
            </Link>
            <Link href="/donate">
              <a className="text-xl mb-2 text-gray-800 hover:text-green-800 font-bold no-underline">Donate</a>
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

        <label htmlFor="openMenu">
          <div className="flex justify-start cursor-pointer">
            <img src="/static/menu.png" alt="menu icon"/>
          </div>
        </label>

        <div className="flex flex-grow justify-center">
          <Link prefetch href="/">
            <img src="/static/headerMini.png" alt="header logo" className="cursor-pointer"/>
          </Link>
        </div>
        <div className="flex justify-end">
          <Link href="/">
            <span className="cursor-pointer text-base text-gray-800 hover:text-green-800 font-bold no-underline">
              <a className="hidden lg:inline mr-8">English</a>
              <a className="inline lg:hidden">EN</a>
            </span>
          </Link>
          <Link href="/login">
            <a className="hidden lg:inline text-gray-800 hover:text-green-800 font-bold no-underline">Log In</a>
          </Link>
        </div>
      </div>

    </header>
  )
}
