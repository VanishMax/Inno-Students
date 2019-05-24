import React from 'react'
import Link from 'next/link'

export default function Header () {
  return (
    <nav className="flex w-10-12-auto items-center justify-between bg-white p-3">
      <div className="flex">
        <Link prefetch href="/">
          <img src="/static/headerMini.png" alt="header logo" className="cursor-pointer"/>
        </Link>
      </div>

      <div className="flex justify-between text-gray-900 no-underline font-semibold text-base text-sm">
        <div className="mr-10">
          <Link prefetch href="/about">
            <a className=" py-2 pl-3 hover:text-gray-200">Events</a>
          </Link>
        </div>
        <div className="mr-10">
          <Link prefetch href="/about">
            <a className="py-2 pl-3 hover:text-gray-200">Clubs</a>
          </Link>
        </div>
        <div className="mr-10">
          <Link prefetch href="/about">
            <a className="py-2 pl-3 hover:text-gray-200">People</a>
          </Link>
        </div>
        <div className="mr-10">
          <Link prefetch href="/about">
            <a className="py-2 pl-3 hover:text-gray-200">Campus life</a>
          </Link>
        </div>
        <div>
          <Link prefetch href="/about">
            <a className="py-2 pl-3 hover:text-gray-200">Videos</a>
          </Link>
        </div>
      </div>

      <div className="flex justify-end">
        <Link href="https://github.com/vanishmax/modern-web-app">
          <a className="text-gray-800 font-bold font-comforta py-1 px-4 no-underline" target="_blank">English</a>
        </Link>
      </div>
    </nav>
  )
}
