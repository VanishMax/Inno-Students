import React, {useContext, useState, useEffect, useRef} from 'react'
import Link from '../components/Link'
import Lang from '../langs/header'
import { LangContext, AuthContext } from '../middleware/context'

export default function Header (props) {
  const lang = useContext(LangContext)
  const [opened, setOpen] = useState('closed')
  const open = () => setOpen('opened')
  const close = () => setOpen('closed')

  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);

  const user = useContext(AuthContext)
  const [isAuthed] = useState(user._id !== undefined)

  return (
    <header className="app flex items-center justify-between p-3">

      {/* Large viewport (>1024px) */}
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
          <span onClick={props.changeLang} className="mr-8 text-gray-800 font-bold no-underline hover:text-green-800 cursor-pointer">{Lang.lang[lang]}</span>

          {isAuthed ?
            <React.Fragment>
              <span>
                <img onClick={() => setIsComponentVisible(!isComponentVisible)} src="/static/user.png" className="cursor-pointer"/>
              </span>

              {isComponentVisible &&
                <div ref={ref} className="absolute w-32 mt-8 bg-white shadow rounded py-3 px-6">
                  <Link href="/user">
                    <a onClick={() => setIsComponentVisible(false)} className="text-gray-800 font-semibold no-underline hover:text-green-800 leading-loose">{Lang.profile[lang]}</a>
                  </Link>
                  <br/>
                  <Link href="/logout">
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


      {/* Small viewport (<1024px) */}
      <div className="flex lg:hidden flex-grow items-center justify-between">

        <div className="flex justify-end">
          <Link href="/">
            <span className="cursor-pointer text-base text-gray-800 font-bold no-underline">
              <span onClick={props.changeLang} className="inline lg:hidden font-normal cursor-pointer">{Lang.langSm[lang]}</span>
            </span>
          </Link>
        </div>

        <div className="flex flex-grow justify-center">
          <Link prefetch href="/">
            <img src="/static/headerMini.png" alt="header logo" className="cursor-pointer" onClick={close}/>
          </Link>
        </div>


        {/* Menu overlay works only if checkbox is checked after clicking on hamburger */}
        {/* Styles are in the index.css file */}

        <div>
          <div className={"openMenu justify-start cursor-pointer " + opened} onClick={open}>
            <img src="/static/menu.png" alt="menu icon"/>
          </div>
          <div className={"closeMenu justify-start cursor-pointer " + opened} onClick={close}>
            <img src="/static/close.png" alt="close menu icon"/>
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
                <Link href="/user/logout">
                  <a className="mb-2" onClick={close}>{Lang.logout[lang]}</a>
                </Link>
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
                <img src="/static/socials/telegram.png"/>
              </a>
            </Link>
            <Link href="https://vk.com/InnoStudents">
              <a className="mr-2" target="_blank">
                <img src="/static/socials/vk.png"/>
              </a>
            </Link>
            <Link href="https://instagram.com/InnoStudents">
              <a className="mr-2" target="_blank">
                <img src="/static/socials/instagram.png"/>
              </a>
            </Link>
            <Link href="https://facebook.com/InnopolisStudents">
              <a className="mr-2" target="_blank">
                <img src="/static/socials/facebook.png"/>
              </a>
            </Link>
            <Link href="https://www.youtube.com/channel/UCwmOq5S4wwmycTgcxUT0-eQ">
              <a target="_blank">
                <img src="/static/socials/youtube.png"/>
              </a>
            </Link>
          </div>
        </div>

      </div>
    </header>
  )
}

const useComponentVisible = (initialIsVisible) => {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
  const ref = useRef(null)

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return { ref, isComponentVisible, setIsComponentVisible }
}
