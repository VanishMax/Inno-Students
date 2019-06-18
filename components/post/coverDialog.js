import React from 'react'
import {bucket} from '../../constants/user'

export default ({isOpen, toggle, images, chosen, choose}) => {
  return (
    <div className={'pt-8 bg-white coverDialog ' + (isOpen ? 'show' : '')}>
      <div onClick={toggle} className="coverDialogClose cursor-pointer">x</div>
      <div className="app flex items-center justify-around flex-wrap flex-col md:flex-row">
        {images.map((img, i) => (
          <div key={i} className={'coverImage relative w-full md:w-1/4 mr-4 mb-6 cursor-pointer '}>
            <div onClick={() => choose(img)}
                 className={'coverImageOverlay ' + (img === chosen ? 'chosen' : '')}>
              <div className="coverImageOverlayChosen">✓</div>
            </div>
            <img src={bucket + img} />
            {i % 3 === 0 && <br className="fullBr" /> }
          </div>
        ))}
      </div>
    </div>
  )
}
