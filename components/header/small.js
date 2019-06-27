import React from 'react'
import Link from '../link'
import Lang from '../../langs/header'
import Socials from '../socials'
import LLink from 'next/link'

export default ({lang, isAuthed, opened, open, close, changeLang}) => {

  let query = lang === 'ru' ? '?lang=ru' : ''

  return (
    <div className="flex lg:hidden flex-grow items-center justify-between">

      <div className="flex justify-end">
        <Link href="/">
            <span className="cursor-pointer text-base text-gray-800 font-bold no-underline">
              <span onClick={changeLang} className="inline lg:hidden font-normal cursor-pointer">{Lang.langSm[lang]}</span>
            </span>
        </Link>
      </div>

      <div className="flex flex-grow justify-center">
        <Link prefetch href="/">
          <img src="/static/images/headerMini.png" alt="header logo" className="cursor-pointer" onClick={close}/>
        </Link>
      </div>


      {/* Menu overlay works only if checkbox is checked after clicking on hamburger */}
      {/* Styles are in the index.css file */}

      <div>
        <div className={"openMenu justify-start cursor-pointer " + opened} onClick={open}>
          <img src="/static/images/icons/menu.png" alt="menu icon"/>
        </div>
        <div className={"closeMenu justify-start cursor-pointer " + opened} onClick={close}>
          <img src="/static/images/icons/close.png" alt="close menu icon"/>
        </div>
      </div>

      <div id="menu" className={"pt-4 " + (opened)}>
        <div className="flex flex-col flex-grow justify-center items-center text-xl no-underline">
          <LLink href="/tag?slug=event" as={'/tag/event' + query}>
            <a className="mb-2" onClick={close}>{Lang.events[lang]}</a>
          </LLink>
          <LLink href="/tag?slug=clubs" as={'/tag/clubs' + query}>
            <a className="mb-2" onClick={close}>{Lang.clubs[lang]}</a>
          </LLink>
          <LLink href="/tag?slug=people" as={'/tag/people' + query}>
            <a className="mb-2" onClick={close}>{Lang.people[lang]}</a>
          </LLink>
          <LLink href="/tag?slug=campus-life" as={'/tag/campus-life' + query}>
            <a className="mb-2" onClick={close}>{Lang.campuslife[lang]}</a>
          </LLink>
          <LLink href="/tag?slug=video" as={'/tag/video' + query}>
            <a className="mb-2" onClick={close}>{Lang.videos[lang]}</a>
          </LLink>
        </div>

        <hr/>
        <div className="flex flex-col flex-grow justify-center items-center pt-4 text-xl no-underline">

          {isAuthed ?
            <React.Fragment>
              <Link href="/user">
                <a className="mb-2" onClick={close}>{Lang.profile[lang]}</a>
              </Link>
              <a className="mb-2" onClick={close} href="/user/logout">{Lang.logout[lang]}</a>
            </React.Fragment>

            :
            <Link href="/user/login">
              <a className="mb-2" onClick={close}>{Lang.login[lang]}</a>
            </Link>
          }

          <Link href="/about">
            <a className="mb-2" onClick={close}>{Lang.about[lang]}</a>
          </Link>
          <Link href="/writer">
            <a className="mb-2" onClick={close}>{Lang.writer[lang]}</a>
          </Link>
          <Link href="/donate">
            <a className="mb-2" onClick={close}>{Lang.donate[lang]}</a>
          </Link>
        </div>

        <hr/>
        <div className="flex pt-4 justify-center">
          <Socials size={6} />
        </div>
      </div>

    </div>
  )
}
