import React from 'react'
import isAuthed from '../../middleware/HOCs/isAuthed'
import Link from '../../components/link'

const Profile = (props) => {
  return (
    <div className="app mt-10">
      <div className="flex justify-between items-end">
        <Link href="/">
          <a className="hover:text-green-700">Мои посты</a>
        </Link>
        <Link href="/">
          <a className="hover:text-green-700">Новый пост</a>
        </Link>
        <Link href="/">
          <img src="/static/images/square.png" className="avatar user shadow w-24 h-24" />
        </Link>
        <Link href="/">
          <a className="hover:text-green-700">Черновики</a>
        </Link>
        <Link href="/user/logout">
          <a className="hover:text-green-700">Выйти</a>
        </Link>
      </div>
      <hr />
    </div>
  )
}

export default isAuthed(Profile)
