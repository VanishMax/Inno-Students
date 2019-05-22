import { actionTypes } from './actions'

const exampleInitialState = {
  count: 0
}

export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.INCREASE:
      return {...state, count: state.count + 1 }
    case actionTypes.DECREASE:
      return {...state, count: state.count - 1 }
    default:
      return state
  }
}
