import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function Loading(props) {
  if (props.error) {
    console.log(props.error)
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>
  } else if (props.pastDelay) {
    return <CircularProgress color="primary" style={{margin: '50px 0 0 50px'}}/>
  } else {
    return null
  }
}