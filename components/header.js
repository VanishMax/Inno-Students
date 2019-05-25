import React from 'react'
import Link from 'next/link'

export default function Header () {
  return (
    <header className="app flex items-center justify-between p-3">
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
            <a className="mr-8 text-gray-800 font-bold no-underline" target="_blank">English</a>
          </Link>
          <Link href="/login">
            <a className="text-gray-800 font-bold no-underline" target="_blank">Log In</a>
          </Link>
        </div>
      </div>

      <div className="flex lg:hidden flex-grow items-center justify-between">
        <div className="flex justify-start">
          <img src="/static/menu.png" alt="menu icon"/>
        </div>
        <div className="flex flex-grow justify-center">
          <Link prefetch href="/">
            <img src="/static/headerMini.png" alt="header logo" className="cursor-pointer"/>
          </Link>
        </div>
        <div className="flex justify-end">
          <Link href="/">
            <a className="text-gray-800 font-bold font-comforta no-underline" target="_blank">English</a>
          </Link>
        </div>
      </div>
    </header>
  )
}
