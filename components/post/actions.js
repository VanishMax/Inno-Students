import React from 'react'

export default ({isEdit, edit}) => {
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

        <div className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700">
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
          <div className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700">
            <span className="hidden md:inline">Share with </span>Editors
          </div>

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
