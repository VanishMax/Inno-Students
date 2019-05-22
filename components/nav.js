import React from 'react'
import Link from 'next/link'

export default function Nav () {
  return (
    <nav className="flex w-60-auto items-center justify-center flex-wrap bg-white p-3">
      <div className="text-sm mr-10 flex flex-grow">
        <Link prefetch href="/about">
          <a className="text-gray-800 font-comforta py-2 pl-3 no-underline text-lg hover:text-gray-200">About</a>
        </Link>
      </div>
      <div className="mr-10 flex flex-grow">
        <Link prefetch href="/">
          <img src="/static/headerMini.png" alt="header logo" className="cursor-pointer"/>
        </Link>
      </div>
      <div>
        <Link href="https://github.com/vanishmax/modern-web-app">
          <a className="text-gray-800 font-bold font-comforta py-1 px-4 no-underline" target="_blank">GitHub</a>
        </Link>
      </div>
    </nav>
  )
}
