import React from 'react'
import Link from '../../components/Link'
import Lang from '../../langs/header'

export default ({lang, isAuthed, myref, isComponentVisible, setIsComponentVisible, changeLang}) => {

  return (
    <div className="hidden lg:flex flex-grow items-center justify-between">
      <div className="flex">
        <Link prefetch href="/">
          <img src="/static/headerMini.png" alt="header logo" className="cursor-pointer"/>
        </Link>
      </div>

      <div className="flex justify-between text-gray-900 no-underline font-semibold text-base text-sm">
        <div className="mr-12">
          <Link prefetch href="/">
            <a className="hover:text-green-800">{Lang.events[lang]}</a>
          </Link>
        </div>
        <div className="mr-12">
          <Link prefetch href="/">
            <a className="hover:text-green-800">{Lang.clubs[lang]}</a>
          </Link>
        </div>
        <div className="mr-12">
          <Link prefetch href="/">
            <a className="hover:text-green-800">{Lang.people[lang]}</a>
          </Link>
        </div>
        <div className="mr-12">
          <Link prefetch href="/">
            <a className="hover:text-green-800">{Lang.campuslife[lang]}</a>
          </Link>
        </div>
        <div>
          <Link prefetch href="/">
            <a className="hover:text-green-800">{Lang.videos[lang]}</a>
          </Link>
        </div>
      </div>

      <div className="flex justify-end">
        <span onClick={changeLang} className="mr-8 text-gray-800 font-bold no-underline hover:text-green-800 cursor-pointer">{Lang.lang[lang]}</span>

        {isAuthed ?
          <React.Fragment>
              <span>
                <img onClick={() => setIsComponentVisible(!isComponentVisible)} src="/static/user.png" className="cursor-pointer"/>
              </span>

            {isComponentVisible &&
            <div ref={myref} className="absolute w-32 mt-8 bg-white shadow rounded py-3 px-6">
              <Link href="/user">
                <a onClick={() => setIsComponentVisible(false)} className="text-gray-800 font-semibold no-underline hover:text-green-800 leading-loose">{Lang.profile[lang]}</a>
              </Link>
              <br/>
              <Link href="/user/logout">
                <a onClick={() => setIsComponentVisible(false)} className="text-gray-800 font-semibold no-underline hover:text-green-800 leading-loose">{Lang.logout[lang]}</a>
              </Link>
            </div>
            }
          </React.Fragment>
          :
          <Link href="/user/login">
            <a className="text-gray-800 font-bold no-underline hover:text-green-800">{Lang.login[lang]}</a>
          </Link>
        }
      </div>
    </div>
  )
}
