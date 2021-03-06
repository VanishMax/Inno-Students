import React, { useContext } from 'react';
import Lang from '../langs/header';
import { LangContext } from '../middleware/context';
import Link from './link';
import Socials from './socials';

const footer = () => {
  const lang = useContext(LangContext);
  return (
    <footer className="bg-white footer w-full">
      <div className="flex items-center justify-between py-8 px-4 lg:px-8">
        <div className="flex">
          <Link href="/">
            <img src="/static/images/headerMini.png" alt="footer logo" className="logo cursor-pointer" />
          </Link>
        </div>

        <div className="flex justify-between">
          <div className="hidden md:flex">
            <div className="md:mr-12">
              <Link href="/post" query={{ slug: '19-06-24-new-technology-in-iu' }} as="/post/19-06-24-new-technology-in-iu">
                <a className="header-link">{Lang.about[lang]}</a>
              </Link>
            </div>
            <div className="md:mr-12">
              <Link href="/post" query={{ slug: 'become-an-author' }} as="/post/become-an-author">
                <a className="header-link">{Lang.writer[lang]}</a>
              </Link>
            </div>
            <div>
              <Link href="/post" query={{ slug: '19-06-24-new-technology-in-iu' }} as="/post/19-06-24-new-technology-in-iu">
                <a className="header-link">{Lang.donate[lang]}</a>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Socials size={6} />
        </div>
      </div>
    </footer>
  );
};

export default footer;
