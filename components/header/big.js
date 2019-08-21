import React from 'react';
import PropTypes from 'prop-types';
import Link from '../link';
import Lang from '../../langs/header';

const DesktopHeader = ({ lang, changeLang }) => {
  const Opener = ({ open }) => (
    <span>
      <img onClick={open} src="/static/images/icons/user.png" className="cursor-pointer" />
    </span>
  );
  Opener.propTypes = {
    open: PropTypes.func.isRequired,
  };

  return (
    <nav className="big-nav">
      <div className="flex">
        <Link href="/">
          <img src="/static/images/headerMini.png" alt="header logo" className="logo cursor-pointer" />
        </Link>
      </div>

      <div className="flex justify-between">
        <div className="mr-12">
          <Link href="/tag" query={{ slug: 'event' }} as="/tag/event">
            <a className="header-link">{Lang.events[lang]}</a>
          </Link>
        </div>
        <div className="mr-12">
          <Link href="/tag" query={{ slug: 'clubs' }} as="/tag/clubs">
            <a className="header-link">{Lang.clubs[lang]}</a>
          </Link>
        </div>
        <div className="mr-12">
          <Link href="/tag" query={{ slug: 'people' }} as="/tag/people">
            <a className="header-link">{Lang.people[lang]}</a>
          </Link>
        </div>
        <div className="mr-12">
          <Link href="/tag" query={{ slug: 'campus-life' }} as="/tag/campus-life">
            <a className="header-link">{Lang.campuslife[lang]}</a>
          </Link>
        </div>
        <div>
          <Link href="/tag" query={{ slug: 'video' }} as="/tag/video">
            <a className="header-link">{Lang.videos[lang]}</a>
          </Link>
        </div>
      </div>

      <div className="flex justify-end">
        <span onClick={changeLang} className="mr-8 header-link">{Lang.lang[lang]}</span>
      </div>
    </nav>
  );
};

DesktopHeader.propTypes = {
  lang: PropTypes.string.isRequired,
  changeLang: PropTypes.func.isRequired,
};

export default DesktopHeader;
