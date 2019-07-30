import React from 'react';
import PropTypes from 'prop-types';
import { ImageBlockConfig } from 'Dante2/package/lib/components/blocks/image';
import { VideoBlockConfig } from 'Dante2/package/lib/components/blocks/video';
import { PlaceholderBlockConfig } from 'Dante2/package/lib/components/blocks/placeholder';
import { DividerBlockConfig } from 'Dante2/package/lib/components/blocks/divider';
import ContentEditable from 'react-contenteditable';
import dynamic from 'next/dynamic';

const Dante = dynamic(() => import('Dante2'), { ssr: false });

const Inputs = ({
  lang, post, changeContent, form, changeForm, isEdit, titleRef, leadRef,
}) => (
  <React.Fragment>
    <ContentEditable
      className="block w-full text-3xl md:text-5xl px-0 leading-tight overflow-hidden focus:outline-none"
      html={form[lang].title}
      placeholder="Put your title here"
      disabled={!isEdit}
      onChange={e => changeForm(e, 'title')}
      innerRef={titleRef}
    />
    <ContentEditable
      className="block w-full text-xl md:text-xl leading-tight text-gray-600 overflow-hidden focus:outline-none"
      html={form[lang].lead}
      disabled={!isEdit}
      placeholder="Put your lead here"
      onChange={e => changeForm(e, 'lead')}
      innerRef={leadRef}
    />

    {lang === 'en' ? (
      <div className="mt-6">
        <div />
        <Dante
          onChange={changeContent}
          content={form.en.content}
          read_only={!isEdit}
          widgets={[
            ImageBlockConfig({ options: { upload_url: `/post/edit/img?post=${post}` } }),
            VideoBlockConfig({ options: { placeholder: 'put an external video link', endpoint: '//noembed.com/embed?url=', caption: 'optional caption' } }),
            PlaceholderBlockConfig(),
            DividerBlockConfig(),
          ]}
        />
      </div>
    ) : (
      <div className="mt-6">
        <Dante
          onChange={changeContent}
          content={form.ru.content}
          read_only={!isEdit}
          widgets={[
            ImageBlockConfig({ options: { upload_url: `/post/edit/img?post=${post}` } }),
            VideoBlockConfig({ options: { placeholder: 'put an external video link', endpoint: '//noembed.com/embed?url=', caption: 'optional caption' } }),
            PlaceholderBlockConfig(),
            DividerBlockConfig(),
          ]}
        />
      </div>
    )}
  </React.Fragment>
);

Inputs.propTypes = () => {
  // eslint-disable-next-line no-use-before-define
  const Element = typeof Element === 'undefined' ? () => {} : Element;
  return {
    lang: PropTypes.string.isRequired,
    post: PropTypes.number.isRequired,
    form: PropTypes.shape({
      en: PropTypes.object,
      ru: PropTypes.object,
    }),
    changeContent: PropTypes.func.isRequired,
    changeForm: PropTypes.func.isRequired,
    isEdit: PropTypes.bool.isRequired,
    titleRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]).isRequired,
    leadRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]).isRequired,
  };
};

Inputs.defaultProps = {
  form: {},
};

export default Inputs;
