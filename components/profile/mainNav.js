import React from 'react';
import Link from '../link';
import Lang from '../../langs/profile';

export default ({ lang, img, goFromEdit }) => (
  <React.Fragment>
    <div className="flex justify-around items-end">
      <div className="flex justify-center w-1/3 md:w-1/5">
        <Link href="/user/posts">
          <a className="hover:text-green-700">{Lang.myposts[lang]}</a>
        </Link>
      </div>
      <div className="hidden md:flex md:justify-center md:w-1/5">
        <Link href="/user/newpost">
          <a className="hover:text-green-700">{Lang.newpost[lang]}</a>
        </Link>
      </div>
      <div className="flex justify-center w-1/3 md:w-1/5">
        <img src={img} onClick={goFromEdit} className="avatar user cursor-pointer shadow w-24 h-24" />
      </div>
      <div className="flex justify-center w-1/3 md:w-1/5">
        <Link href="/user/drafts">
          <a className="hover:text-green-700">{Lang.drafts[lang]}</a>
        </Link>
      </div>
      <div className="hidden md:flex md:justify-center md:w-1/5">
        <a href="/user/logout" className="hover:text-green-700">{Lang.logout[lang]}</a>
      </div>
    </div>

    <hr />

    <div className="flex justify-around items-end md:hidden">
      <div className="flex justify-center w-1/3">
        <Link href="/user/newpost">
          <a className="hover:text-green-700">{Lang.newpost[lang]}</a>
        </Link>
      </div>
      <div className="flex justify-center w-1/3" />
      <div className="flex justify-center w-1/3">
        <a href="/user/logout" className="hover:text-green-700">{Lang.logout[lang]}</a>
      </div>
    </div>
  </React.Fragment>
);
