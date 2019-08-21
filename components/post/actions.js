import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-unfetch';
import Dropdown from '../dropdown';

const PostActions = ({
  isEdit, edit, toggleCover, togglePublish, postID,
  lang, snack, isDelete, changeDeletion, sharedWith,
  isPublished, isExclusive,
}) => {
  // Sharing the post with other editors
  const [users, changeUsers] = useState(null);
  const getUsers = async () => {
    const data = await fetch('/user/editors', {
      method: 'POST',
    }).then(res => res.json());
    changeUsers(data.users.map((_user) => {
      const userItem = Object.assign({}, _user);
      userItem.isShared = sharedWith.indexOf(userItem._id) !== -1;
      return userItem;
    }));
  };

  // By clicking in the dropdown on the name of the editor
  const toggleShare = async (id) => {
    let action = '';
    changeUsers(users.map((_user) => {
      const userItem = Object.assign({}, _user);
      if (userItem._id === id) {
        if (userItem.isShared) action = 'Deshare';
        else action = 'Share';
        userItem.isShared = !userItem.isShared;
      }
      return userItem;
    }));

    const data = await fetch('/post/edit/share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ post: postID, user: id, action }),
    }).then(res => res.json());
    snack(data.message);
  };

  const DropValue = ({ user }) => (
    <div
      onClick={() => toggleShare(user._id)}
      className={`w-full px-4 leading-normal tracking-wide border-b-2 border-gray-100 border-solid py-2 cursor-pointer
         ${user.isShared ? 'bg-green-100' : 'bg-white hover:bg-green-100'}`}
    >
      <span>{user[lang].name ? (`${user[lang].name} ${user[lang].surname}`) : user.username}</span>
    </div>
  );
  DropValue.propTypes = {
    user: PropTypes.shape({
      _id: PropTypes.number,
      isShared: PropTypes.bool,
      username: PropTypes.string,
    }).isRequired,
  };

  const Opener = ({ open }) => (
    <span onClick={() => { getUsers(); open(); }} className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700">
      <span className="hidden md:inline">Share with </span>
      Editors
    </span>
  );
  Opener.propTypes = {
    open: PropTypes.func.isRequired,
  };

  return (
    <div className="mb-4">
      <hr />
      <div className="flex flex-wrap justify-around items-center py-1">
        {isEdit ? (
          <div
            onClick={edit}
            className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700"
          >
          Read
          </div>
        ) : (
          <div
            onClick={edit}
            className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700"
          >
          Edit
          </div>
        )}

        <div
          onClick={toggleCover}
          className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700"
        >
          Cover
          &nbsp;
          <span className="hidden md:inline">change</span>
        </div>

        {isEdit && (
          <React.Fragment>
            <div
              className="border border-gray-200 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700"
            >
              <span className="hidden md:inline">Connect to </span>
              G.Photo
            </div>
          </React.Fragment>
        )}

        {(!isEdit && !isPublished) && (
          <React.Fragment>
            <Dropdown Opener={Opener} size={48} margin={32} height={48} padding="0" stopAutoclose>
              <React.Fragment>
                {users === null
                  ? (
                    <div>
                    Loading
                    </div>
                  )
                  : (
                    <React.Fragment>
                      {users.map((user, i) => (
                        <DropValue key={i} user={user} index={i} />
                      ))}
                    </React.Fragment>
                  )
                }
              </React.Fragment>
            </Dropdown>
          </React.Fragment>
        )}

        {!isPublished && <br className="fullBrSmall sm:hidden" />}

        {(!isPublished || isExclusive) && (
          <div
            onClick={togglePublish}
            className="border border-green-300 rounded bg-white text-black py-2 px-4 cursor-pointer hover:border-green-700 hover:text-green-700"
          >
            Publish
          </div>
        )}

        {isPublished ? (
          <div
            onClick={() => changeDeletion(true)}
            className={`border rounded text-black py-2 px-4 cursor-pointer
          ${isDelete ? 'border-red-600 bg-red-600 text-white hover:border-red-900 hover:border-red-900'
              : ' border-red-300 bg-white hover:border-red-700 hover:text-red-700'}`}
          >
          Archive
          </div>
        ) : (
          <div
            onClick={() => changeDeletion(false)}
            className={`border rounded text-black py-2 px-4 cursor-pointer
          ${isDelete ? 'border-red-600 bg-red-600 text-white hover:border-red-900 hover:border-red-900'
              : ' border-red-300 bg-white hover:border-red-700 hover:text-red-700'}`}
          >
          Delete
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};

//   snack, sharedWith,

PostActions.propTypes = {
  lang: PropTypes.string.isRequired,
  postID: PropTypes.number.isRequired,
  isEdit: PropTypes.bool.isRequired,
  isPublished: PropTypes.bool.isRequired,
  isExclusive: PropTypes.bool.isRequired,
  isDelete: PropTypes.bool.isRequired,
  edit: PropTypes.func.isRequired,
  toggleCover: PropTypes.func.isRequired,
  changeDeletion: PropTypes.func.isRequired,
  togglePublish: PropTypes.func.isRequired,
  snack: PropTypes.func.isRequired,
  sharedWith: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default PostActions;
