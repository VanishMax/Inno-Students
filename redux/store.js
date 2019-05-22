import { createStore } from 'redux'

import { reducer } from './reducers'

export function initializeStore (initialState) {
  return createStore(
    reducer,
    initialState
  )
}
