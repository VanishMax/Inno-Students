import React from 'react'
import clickAway from '../middleware/clickAway'

export default ({Opener, children, size, margin, height, padding, stopAutoclose}) => {
  const {ref, isComponentVisible, setIsComponentVisible} = clickAway(false)

  return(
    <React.Fragment>

      <Opener open={() => setIsComponentVisible(true)} />

      {isComponentVisible &&
        <div ref={ref} onClick={() => stopAutoclose ? null : setIsComponentVisible(false)}
             className={`w-${size} mt-${margin} h-${height} px-${padding || 6} absolute bg-white shadow rounded py-3 z-10 overflow-y-scroll`}>
          {children}
        </div>
      }

    </React.Fragment>
  )
}
