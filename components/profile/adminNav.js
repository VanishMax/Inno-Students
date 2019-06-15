import React from 'react'
import Link from '../link'
import Lang from '../../langs/profile'

export default ({lang}) => {
  return (
    <React.Fragment>

      <div className="mt-16 md:mt-0 flex justify-around items-end md:hidden">
        <div className="flex justify-center w-1/2">
          <Link href="/user/users">
            <a className="hover:text-green-700">{Lang.users[lang]}</a>
          </Link>
        </div>
        <div className="flex justify-center w-1/2">
          <Link href="/">
            <a className="hover:text-green-700">{Lang.stats[lang]}</a>
          </Link>
        </div>
      </div>

      <hr className="md:mt-16" />

      <div className="flex justify-around items-start mb-24">
        <div className="flex justify-center w-1/2 md:w-1/4">
          <Link href="/user/alldrafts">
            <a className="hover:text-green-700">{Lang.alldrafts[lang]}</a>
          </Link>
        </div>
        <div className="hidden md:flex md:justify-center md:w-1/4">
          <Link href="/user/users">
            <a className="hover:text-green-700">{Lang.users[lang]}</a>
          </Link>
        </div>
        <div className="flex justify-center w-1/2 md:w-1/4">
          <Link href="/user/requests">
            <a className="hover:text-green-700">{Lang.requests[lang]}</a>
          </Link>
        </div>
        <div className="hidden md:flex md:justify-center md:w-1/4">
          <Link href="/user">
            <a className="hover:text-green-700">{Lang.stats[lang]}</a>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}
