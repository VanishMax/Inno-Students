import React from 'react'
import {hydrate} from 'react-dom'
import {Provider} from 'react-redux'
import Loadable from 'react-loadable'
import configureStore from './redux/configureStore'
import { BrowserRouter } from 'react-router-dom'
import App from './App/app'
import MobileApp from './MobileApp/app'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'

// Read the state sent with markup
const state = window.__STATE__
// reproduce the store used to render the page on server
const store = configureStore(state)
delete window.__STATE__
const state1 = store.getState()

const theme = createMuiTheme({
    palette: {
      primary: purple,
      secondary: {
        main: '#f44336',
      },
    },
})

Loadable.preloadReady().then(() => {
  hydrate(
    <Provider store={store} >
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          {state1.mobile === null ? <App/> : <MobileApp/> }
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>,
    document.querySelector('#app')
  )
})