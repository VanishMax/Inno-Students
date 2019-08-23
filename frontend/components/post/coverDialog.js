import React from 'react';
import PropTypes from 'prop-types';
import { bucket } from '../../constants/user';
import { Trash } from '../icons/actions';

const CoverDialog = ({
  isOpen, toggle, images, chosen, choose, del,
}) => {
  if (images) {
    return (
      <div className={`pt-8 bg-white full-dialog ${isOpen ? 'show' : ''}`}>
        <div onClick={toggle} className="full-dialog-close cursor-pointer">x</div>
        <div className="app flex items-center justify-around flex-wrap flex-col md:flex-row">
          {images.map((img, i) => (
            <div key={i} className="cover-image relative w-full md:w-1/4 mr-4 mb-6 cursor-pointer ">
              <div
                onClick={() => choose(img)}
                className={`cover-image-overlay ${img === chosen ? 'chosen' : ''}`}
              >
                <div onClick={e => del(e, img)} className="cover-image-overlay-trash"><Trash /></div>
                <div className="cover-image-overlay-chosen">✓</div>
              </div>
              <img src={bucket + img} />
              {i % 3 === 0 && <br className="fullBr" /> }
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <React.Fragment />;
};

CoverDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  chosen: PropTypes.string,
  toggle: PropTypes.func.isRequired,
  choose: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
};
CoverDialog.defaultProps = {
  images: [],
  chosen: null,
};

export default CoverDialog;
