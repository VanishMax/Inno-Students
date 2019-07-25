import React from 'react';
import Link from './link';

import {
  Telegram, FaceBook, Instagram, YouTube, Vkontakte,
} from './icons/socials';

export default ({ size }) => {
  const classes = `mr-2 w-${size} h-${size}`;
  return (
    <React.Fragment>
      <a href="https://t.me/InnoStudents" className={classes} target="_blank">
        <Telegram />
      </a>
      <a href="https://vk.com/InnoStudents" className={classes} target="_blank">
        <Vkontakte />
      </a>
      <a href="https://instagram.com/InnoStudents" className={classes} target="_blank">
        <Instagram />
      </a>
      <a href="https://facebook.com/InnopolisStudents" className={classes} target="_blank">
        <FaceBook />
      </a>
      <a href="https://www.youtube.com/channel/UCwmOq5S4wwmycTgcxUT0-eQ" target="_blank" className={classes}>
        <YouTube />
      </a>
    </React.Fragment>
  );
};
