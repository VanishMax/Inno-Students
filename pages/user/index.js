import React from 'react'
import isAuthed from '../../middleware/HOCs/isAuthed'

const Profile = (props) => {
  return (
    <h1>
      Nu cho
    </h1>
  )
}

export default isAuthed(Profile)
