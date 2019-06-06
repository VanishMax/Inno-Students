import React from 'react'
import Head from 'next/head'
import isAuthed from '../../middleware/HOCs/isAuthed'
import Link from '../../components/link'

const Profile = ({user}) => {

  return (
    <React.Fragment>
      <Head>
        <title>Profile | InnoStudents</title>
      </Head>
      <div className="app mt-10">

        <div className="flex justify-around items-end">
          <Link href="/">
            <a className="hover:text-green-700">Мои посты</a>
          </Link>
          <Link href="/">
            <a className="hover:text-green-700">Новый пост</a>
          </Link>
          <Link href="/">
            <img src="/static/images/square.png" className="avatar user cursor-pointer shadow w-24 h-24" />
          </Link>
          <Link href="/">
            <a className="hover:text-green-700">Черновики</a>
          </Link>
          <Link href="/user/logout">
            <a className="hover:text-green-700">Выйти</a>
          </Link>
        </div>
        <hr />

        <div className="flex flex-col items-center justify-center mt-16">
          <div className="text-xl text-semibold mb-4 tracking-wider">Maxim @VanishMax Korsunov</div>
          <a
            href="https://instagram.com/vanishmax"
            className="text-lg italic hover:text-green-700 mb-4"
            target="_blank"
          >
            instagram.com/vanishmax
          </a>
          <div className="text-xl mb-6">
            Администратор
          </div>
          <div className="border border-gray-900 cursor-pointer rounded shadow px-4 py-2 hover:border-green-700 hover:text-green-700">
            Редактировать
          </div>
        </div>

        {user.role === "A" &&
          <React.Fragment>
            <hr className="mt-24" />
            <div className="flex justify-around items-start">
              <Link href="/">
                <a className="hover:text-green-700">Все черновики</a>
              </Link>
              <Link href="/">
                <a className="hover:text-green-700">Пользователи</a>
              </Link>
              <Link href="/">
                <a className="hover:text-green-700">Сообщения</a>
              </Link>
              <Link href="/">
                <a className="hover:text-green-700">Статистика</a>
              </Link>
            </div>
          </React.Fragment>
        }
      </div>
    </React.Fragment>
  )
}

export default isAuthed(Profile)
