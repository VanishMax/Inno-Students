import React from 'react'
import Link from '../link'
import LLink from 'next/link'
import Lang from '../../langs/header'
import Dropdown from '../dropdown'

export default ({lang, isAuthed, changeLang}) => {

  let query = lang === 'ru' ? '?lang=ru' : ''

  const Opener = ({open}) =>
    <span>
      <img onClick={open} src="/static/images/icons/user.png" className="cursor-pointer"/>
    </span>

  return (
    <div className="hidden lg:flex flex-grow items-center justify-between">
      <div className="flex">
        <Link prefetch href="/">
          <img src="/static/images/headerMini.png" alt="header logo" className="cursor-pointer"/>
        </Link>
      </div>

      <div className="flex justify-between">
        <div className="mr-12">
          <LLink href="/tag?slug=event" as={'/tag/event' + query}>
            <a className="header-link">{Lang.events[lang]}</a>
          </LLink>
        </div>
        <div className="mr-12">
          <LLink href="/tag?slug=clubs" as={'/tag/clubs' + query}>
            <a className="header-link">{Lang.clubs[lang]}</a>
          </LLink>
        </div>
        <div className="mr-12">
          <LLink href="/tag?slug=people" as={'/tag/people' + query}>
            <a className="header-link">{Lang.people[lang]}</a>
          </LLink>
        </div>
        <div className="mr-12">
          <LLink href="/tag?slug=campus-life" as={'/tag/campuslife' + query}>
            <a className="header-link">{Lang.campuslife[lang]}</a>
          </LLink>
        </div>
        <div>
          <LLink href="/tag?slug=video" as={'/tag/video' + query}>
            <a className="header-link">{Lang.videos[lang]}</a>
          </LLink>
        </div>
      </div>

      <div className="flex justify-end">
        <span onClick={changeLang} className="mr-8 header-link">{Lang.lang[lang]}</span>

        {isAuthed ?
          <Dropdown Opener={Opener} size={32} margin={8}>
            <Link href="/user">
              <a className="text-gray-800 font-semibold no-underline hover:text-green-800 leading-loose">
                {Lang.profile[lang]}
              </a>
            </Link>
            <br/>
            <a href="/user/logout" className="text-gray-800 font-semibold no-underline hover:text-green-800 leading-loose">
              {Lang.logout[lang]}
            </a>
          </Dropdown>
          :
          <Link href="/user/login">
            <a className="header-link">{Lang.login[lang]}</a>
          </Link>
        }
      </div>
    </div>
  )
}
