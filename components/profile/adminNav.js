import React from 'react'
import Link from '../link'
import Lang from '../../langs/profile'

export default ({lang}) => {
  return (
    <React.Fragment>
      <hr className="mt-24" />
      <div className="flex justify-around items-end">
        <div className="flex justify-center w-1/5">
          <Link href="/">
            <a className="hover:text-green-700">{Lang.alldrafts[lang]}</a>
          </Link>
        </div>
        <div className="flex justify-center w-1/5">
          <Link href="/">
            <a className="hover:text-green-700">{Lang.users[lang]}</a>
          </Link>
        </div>
        <div className="flex justify-center w-1/5">
          <Link href="/">
            <a className="hover:text-green-700">{Lang.messages[lang]}</a>
          </Link>
        </div>
        <div className="flex justify-center w-1/5">
          <Link href="/">
            <a className="hover:text-green-700">{Lang.stats[lang]}</a>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}
