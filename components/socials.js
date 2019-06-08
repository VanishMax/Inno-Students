import React from 'react'
import Link from './link'

import Telegram from './icons/tg'
import Vkontakte from './icons/vk'
import Instagram from './icons/insta'
import FaceBook from './icons/fb'
import YouTube from './icons/yt'

export default ({size}) => {
  const classes = `mr-2 w-${size} h-${size}`
  return (
    <React.Fragment>
      <Link href="https://t.me/InnoStudents">
        <a className={classes} target="_blank">
          <Telegram />
        </a>
      </Link>
      <Link href="https://vk.com/InnoStudents">
        <a className={classes} target="_blank">
          <Vkontakte />
        </a>
      </Link>
      <Link href="https://instagram.com/InnoStudents">
        <a className={classes} target="_blank">
          <Instagram />
        </a>
      </Link>
      <Link href="https://facebook.com/InnopolisStudents">
        <a className={classes} target="_blank">
          <FaceBook />
        </a>
      </Link>
      <Link href="https://www.youtube.com/channel/UCwmOq5S4wwmycTgcxUT0-eQ">
        <a target="_blank" className={classes}>
          <YouTube />
        </a>
      </Link>
    </React.Fragment>
  )
}
