import React from 'react'
import Link from '../link'
import Lang from '../../langs/header'

export default ({lang, isAuthed, opened, open, close, changeLang}) => {

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
          <Link href="/">
            <a className="mb-2" onClick={close}>{Lang.events[lang]}</a>
          </Link>
          <Link href="/">
            <a className="mb-2" onClick={close}>{Lang.clubs[lang]}</a>
          </Link>
          <Link href="/">
            <a className="mb-2" onClick={close}>{Lang.people[lang]}</a>
          </Link>
          <Link href="/">
            <a className="mb-2" onClick={close}>{Lang.campuslife[lang]}</a>
          </Link>
          <Link href="/">
            <a className="mb-2" onClick={close}>{Lang.videos[lang]}</a>
          </Link>
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
          <Link href="https://t.me/InnoStudents">
            <a className="mr-2" target="_blank">
              <img src="/static/images/socials/telegram.png"/>
            </a>
          </Link>
          <Link href="https://vk.com/InnoStudents">
            <a className="mr-2" target="_blank">
              <img src="/static/images/socials/vk.png"/>
            </a>
          </Link>
          <Link href="https://instagram.com/InnoStudents">
            <a className="mr-2" target="_blank">
              <img src="/static/images/socials/instagram.png"/>
            </a>
          </Link>
          <Link href="https://facebook.com/InnopolisStudents">
            <a className="mr-2" target="_blank">
              <img src="/static/images/socials/facebook.png"/>
            </a>
          </Link>
          <Link href="https://www.youtube.com/channel/UCwmOq5S4wwmycTgcxUT0-eQ">
            <a target="_blank">
              <img src="/static/images/socials/youtube.png"/>
            </a>
          </Link>
        </div>
      </div>

    </div>
  )
}
