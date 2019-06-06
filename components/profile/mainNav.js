import React from 'react'
import Link from '../link'
import Lang from '../../langs/profile'

export default ({lang, img}) => {
  return (
    <React.Fragment>
      <div className="flex justify-around items-end">
        <div className="flex justify-center w-1/5">
          <Link href="/">
            <a className="hover:text-green-700">{Lang.myposts[lang]}</a>
          </Link>
        </div>
        <div className="flex justify-center w-1/5">
          <Link href="/">
            <a className="hover:text-green-700">{Lang.newpost[lang]}</a>
          </Link>
        </div>
        <div className="flex justify-center w-1/5">
          <Link href="/">
            <img src={img} className="avatar user cursor-pointer shadow w-24 h-24" />
          </Link>
        </div>
        <div className="flex justify-center w-1/5">
          <Link href="/">
            <a className="hover:text-green-700">{Lang.drafts[lang]}</a>
          </Link>
        </div>
        <div className="flex justify-center w-1/5">
          <Link href="/user/logout">
            <a className="hover:text-green-700">{Lang.logout[lang]}</a>
          </Link>
        </div>
      </div>

      <hr />
    </React.Fragment>
  )
}
