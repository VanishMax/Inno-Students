import React from 'react'
import clickAway from '../middleware/clickAway'

export default ({Opener, children, size, margin}) => {
  const {ref, isComponentVisible, setIsComponentVisible} = clickAway(false)

  return(
    <React.Fragment>

      <Opener open={() => setIsComponentVisible(true)} />

      {isComponentVisible &&
        <div ref={ref} onClick={() => setIsComponentVisible(false)} className={`w-${size} mt-${margin} absolute bg-white shadow rounded py-3 px-6 z-10`}>
          {children}
        </div>
      }

    </React.Fragment>
  )
}
