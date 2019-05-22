import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default () => {
  const dispatch = useDispatch()
  const increase = useCallback(() => dispatch({ type: 'INCREASE' }), [])
  const decrease = useCallback(() => dispatch({ type: 'DECREASE' }), [])
  const count = useSelector(state => state.count)

  return (
    <React.Fragment>
      <h3 className="text-xl font-semibold text-center my-2">
        Counter itself
      </h3>
      <h3 className="text-xl text-center">{count}</h3>
      <div className="text-center">
        <button onClick={increase} className="btn-gray-outlined">
          Increase
        </button>
        <button onClick={decrease} className="btn-gray-outlined">
          Decrease
        </button>
      </div>
    </React.Fragment>
  )
}
