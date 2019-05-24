import React from 'react'
import Link from 'next/link'

export default function Footer () {
  return (
    <footer className="bg-white footer w-full">
      <div className="w-10-12-auto flex items-center justify-between p-8">
        <div className="flex">
          <Link prefetch href="/">
            <img src="/static/headerMini.png" alt="header logo" className="cursor-pointer"/>
          </Link>
        </div>

        <div className="flex justify-between text-gray-900 no-underline font-semibold text-base text-sm">
          <div className="mr-10">
            <Link prefetch href="/about">
              <a className=" py-2 pl-3 hover:text-gray-200">About Us</a>
            </Link>
          </div>
          <div className="mr-10">
            <Link prefetch href="/writer">
              <a className="py-2 pl-3 hover:text-gray-200">Become a writer</a>
            </Link>
          </div>
          <div className="mr-10">
            <Link prefetch href="/donate">
              <a className="py-2 pl-3 hover:text-gray-200">Donate</a>
            </Link>
          </div>
        </div>

        <div className="flex justify-end">
          <Link prefetch href="/login">
            <a className="text-gray-800 font-bold font-comforta py-1 px-4 no-underline" target="_blank">Log In</a>
          </Link>
        </div>
      </div>
    </footer>
  )
}
