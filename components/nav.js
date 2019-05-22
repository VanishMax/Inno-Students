import React from 'react'
import Link from 'next/link'

export default function Nav () {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-700 p-3">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link prefetch href="/">
          <a className="font-comforta text-white text-xl font-bold py-1 pl-3 rounded no-underline hover:text-gray-200">
            <span className="hidden sm:inline">
              Modern Web App
            </span>
            <span className="inline sm:hidden">
              MWA
            </span>
          </a>
        </Link>
      </div>
      <div className="flex w-auto items-center flex-grow">
        <div className="text-sm flex-grow">
          <Link prefetch href="/about">
            <a className="text-white font-comforta py-2 pl-3 no-underline text-lg hover:text-gray-200">About</a>
          </Link>
        </div>
        <div>
          <Link href="https://github.com/vanishmax/modern-web-app">
            <a className="btn bg-white text-black font-bold font-comforta py-1 px-4 rounded no-underline hover:bg-gray-200" target="_blank">GitHub</a>
          </Link>
        </div>
      </div>
    </nav>
  )
}
