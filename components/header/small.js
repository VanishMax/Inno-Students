import React from 'react'
import Link from '../link'
import Lang from '../../langs/header'
import Socials from '../socials'

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
        <Link href="/" noPrefetch>
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
          <Link href="/tag" query={{slug: 'event'}} as="/tag/event">
            <a className="mb-2" onClick={close}>{Lang.events[lang]}</a>
          </Link>
          <Link href="/tag" query={{slug: 'clubs'}} as="/tag/clubs">
            <a className="mb-2" onClick={close}>{Lang.clubs[lang]}</a>
          </Link>
          <Link href="/tag" query={{slug: 'people'}} as="/tag/people">
            <a className="mb-2" onClick={close}>{Lang.people[lang]}</a>
          </Link>
          <Link href="/tag" query={{slug: 'campus-life'}} as="/tag/campus-life">
            <a className="mb-2" onClick={close}>{Lang.campuslife[lang]}</a>
          </Link>
          <Link href="/tag" query={{slug: 'video'}} as="/tag/video">
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

          <Link href="/post" query={{slug: '19-06-24-new-technology-in-iu'}} as="/post/19-06-24-new-technology-in-iu">
            <a className="mb-2" onClick={close}>{Lang.about[lang]}</a>
          </Link>
          <Link href="/post" query={{slug: '19-06-29-become-a-writer'}} as="/post/19-06-29-become-a-writer">
            <a className="mb-2" onClick={close}>{Lang.writer[lang]}</a>
          </Link>
          <Link href="/post" query={{slug: '19-06-24-new-technology-in-iu'}} as="/post/19-06-24-new-technology-in-iu">
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
