import React from 'react'
import isAuthed from '../../middleware/HOCs/isAuthed'

const Profile = (props) => {
  console.log('profile:', props.user)
  return (
    <h1>
      Nu cho
    </h1>
  )
}

export default isAuthed(Profile)
