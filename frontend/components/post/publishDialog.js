import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NewsCard from '../news/card';
import { CodesLang, Lang } from '../../langs/publish';

const PublishDialog = ({
  isOpen, toggle, post, lang, data, publish,
}) => {
  const [langg, changeLangg] = useState(lang);
  const toggleLangg = () => changeLangg(langg === 'ru' ? 'en' : 'ru');

  return (
    <div className={`py-16 bg-white full-dialog ${isOpen ? 'show' : ''}`}>
      <div onClick={toggle} className="full-dialog-close cursor-pointer">x</div>
      <div
        onClick={toggleLangg}
        className="full-dialog-lang cursor-pointer"
      >
        {langg.toUpperCase()}
      </div>
      <div className="app flex items-center justify-around flex-wrap flex-col md:flex-row">
        <NewsCard big lang={langg} news={post} />
        <div className="mt-6">
          {data && (
            <React.Fragment>

              <div className="flex flex-col">
                <div className="flex justify-center text-lg leading-relaxed">{Lang.publication[langg]}</div>
                <div className="flex justify-between mt-2 text-lg">
                  <span>{Lang.en[langg]}</span>
                  <span className={data.data.en.title ? 'text-green-500' : 'text-red-500'}>
                    •
                    {Lang.title[langg]}
                  </span>
                  <span className={data.data.en.lead ? 'text-green-500' : 'text-red-500'}>
                    •
                    {Lang.lead[langg]}
                  </span>
                  <span className={data.data.en.content ? 'text-green-500' : 'text-red-500'}>
                    •
                    {Lang.content[langg]}
                  </span>
                </div>
                <div className="flex justify-between mt-2 text-lg">
                  <span>{Lang.ru[langg]}</span>
                  <span className={data.data.ru.title ? 'text-green-500' : 'text-red-500'}>
                    •
                    {Lang.title[langg]}
                  </span>
                  <span className={data.data.ru.lead ? 'text-green-500' : 'text-red-500'}>
                    •
                    {Lang.lead[langg]}
                  </span>
                  <span className={data.data.ru.content ? 'text-green-500' : 'text-red-500'}>
                    •
                    {Lang.content[langg]}
                  </span>
                </div>
                <div className="flex justify-between mt-2 text-lg">
                  <span />
                  <span className={data.data.cover ? 'text-green-500' : 'text-red-500'}>
                    •
                    {Lang.cover[langg]}
                  </span>
                </div>
              </div>

              <div className="flex flex-col mt-6 mb-6">
                <div className="flex justify-center text-lg leading-relaxed">
                  {Lang.author[langg]}
                  &nbsp; — @
                  {data.author}
                </div>
                <div className="flex justify-between mt-2 text-lg">
                  <span>{Lang.en[langg]}</span>
                  <span className={data.data.author.en.name ? 'text-green-500' : 'text-orange-500'}>
                    •
                    {Lang.name[langg]}
                  </span>
                  <span className={data.data.author.en.surname ? 'text-green-500' : 'text-orange-500'}>
                    •
                    {Lang.surname[langg]}
                  </span>
                </div>
                <div className="flex justify-between mt-2 text-lg">
                  <span>{Lang.ru[langg]}</span>
                  <span className={data.data.author.ru.name ? 'text-green-500' : 'text-orange-500'}>
                    •
                    {Lang.name[langg]}
                  </span>
                  <span className={data.data.author.ru.surname ? 'text-green-500' : 'text-orange-500'}>
                    •
                    {Lang.surname[langg]}
                  </span>
                </div>
                <div className="flex justify-between mt-2 text-lg">
                  <span />
                  <span className={data.data.author.website ? 'text-green-500' : 'text-orange-500'}>
                    •
                    {Lang.website[langg]}
                  </span>
                </div>
              </div>

              {data.codes.map((code, i) => (
                <p key={i} className={`${CodesLang[code].type === 'W' ? 'text-orange-500' : 'text-red-500'}`}>
                  •&nbsp;
                  {CodesLang[code][langg]}
                </p>
              ))}

              <div className="flex justify-around mt-6">
                <div
                  onClick={toggle}
                  className="mr-8 rounded border border-gray-200 py-2 px-4 text-lg hover:text-green-700 hover:border-green-700 cursor-pointer"
                >
                  {Lang.back[langg]}
                </div>
                {(data.codes.indexOf(0) === -1 && data.codes.indexOf(3) === -1
                  && data.codes.indexOf(1) === -1 && data.codes.indexOf(2) === -1)
                  && (
                    <React.Fragment>
                      <div
                        onClick={() => publish(false)}
                        className="mr-8 rounded border border-green-200 py-2 px-4 text-lg hover:text-green-700 hover:border-green-700 cursor-pointer"
                      >
                        {Lang.publish[langg]}
                      </div>
                      <div
                        onClick={() => publish(false, false)}
                        className="rounded border border-green-200 py-2 px-4 text-lg hover:text-green-700 hover:border-green-700 cursor-pointer"
                      >
                        {Lang.hidPublish[langg]}
                      </div>
                    </React.Fragment>
                  )}
                {((data.codes.indexOf(1) !== -1
                  || data.codes.indexOf(2) !== -1)
                  && data.codes.indexOf(3) === -1)
                  && (
                    <React.Fragment>
                      <div
                        onClick={() => publish(true)}
                        className="mr-8 rounded border border-green-200 py-2 px-4 text-lg hover:text-green-700 hover:border-green-700 cursor-pointer"
                      >
                        {Lang.exclusive[langg]}
                      </div>
                      <div
                        onClick={() => publish(true, false)}
                        className="rounded border border-green-200 py-2 px-4 text-lg hover:text-green-700 hover:border-green-700 cursor-pointer"
                      >
                        {Lang.hidExclusive[langg]}
                      </div>
                    </React.Fragment>
                  )}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

PublishDialog.propTypes = {
  lang: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  publish: PropTypes.func.isRequired,
  post: PropTypes.shape({}),
  data: PropTypes.shape({
    codes: PropTypes.arrayOf(PropTypes.number),
    author: PropTypes.string,
    data: PropTypes.object,
  }),
};

PublishDialog.defaultProps = {
  post: {},
  data: {},
};

export default PublishDialog;
