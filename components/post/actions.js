import React, {useState} from 'react'
import 'isomorphic-unfetch'
import Dropdown from '../dropdown'


export default ({isEdit, edit, toggleCover, postID, sharedWith, lang, snack}) => {

  const [users, changeUsers] = useState(null)
  const getUsers = async () => {
    const data = await fetch('/user/editors', {
      method: 'POST'
    }).then(res => res.json())
    changeUsers(data.users.map(user => {
      user.isShared = sharedWith.indexOf(user._id) !== -1
      return user
    }))
  }

  const toggleShare = async (id) => {
    let action = ''
    changeUsers(users.map(user => {
      if(user._id === id) {
        user.isShared ? action = 'Deshare' : action = 'Share'
        user.isShared = !user.isShared
      }
      return user
    }))

    let data = await fetch('/post/edit/share', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({post: postID, user: id, action: action})
    }).then(res => res.json())
    snack(data.message)
  }

  const DropValue = ({user, open, index}) => {
    return (
      <div onClick={() => toggleShare(user._id)}
        className={`w-full px-4 leading-normal tracking-wide border-b-2 border-gray-100 border-solid py-2 cursor-pointer
         ${user.isShared ? 'bg-green-100' : 'bg-white hover:bg-green-100'}`}>
        <span>{user[lang].name ? (user[lang].name + ' ' + user[lang].surname) : user.username}</span>
      </div>
    )
  }

  const Opener = ({open}) => (
    <span onClick={() => {getUsers(); open()}} className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700">
      <span className="hidden md:inline">Share with </span>Editors
    </span>
  )


  return (
    <div className="mb-4">
      <hr />
      <div className="flex flex-wrap justify-around items-center py-1">
        {isEdit ?
          <div onClick={edit}
               className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700">
            Save
          </div>
          :
          <div onClick={edit}
               className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700">
            Edit
          </div>
        }

        <div onClick={toggleCover}
          className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700">
          Cover <span className="hidden md:inline">change</span>
        </div>

        {isEdit &&
        <React.Fragment>
          <div
            className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700">
            <span className="hidden md:inline">Switch to </span>Russian
          </div>

          <div
            className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700">
            <span className="hidden md:inline">Connect to </span>G.Photo
          </div>
        </React.Fragment>
        }

        {!isEdit &&
        <React.Fragment>
          <Dropdown Opener={Opener} size={48} margin={32} height={48} padding={'0'} stopAutoclose>
            {users === null ?
              <div>
                Loading
              </div>
            :
              <React.Fragment>
                {users.map((user, i) => (
                  <DropValue key={i} user={user} index={i} />
                ))}
              </React.Fragment>
            }
          </Dropdown>

          <br className="fullBrSmall sm:hidden" />

          <div className="border border-green-300 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700">
            Publish
          </div>

          <div className="border border-red-300 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-red-700 hover:text-red-700">
            Delete
          </div>
        </React.Fragment>
        }

      </div>
      <hr />
    </div>
  )
}
