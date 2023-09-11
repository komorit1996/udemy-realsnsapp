import React from "react";

const CloseFriend = ({ user }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <ul className="sidebarFriendList">
      <li className="sidebarFriend">
        <img
          src={PUBLIC_FOLDER + user.profilePicture}
          alt=""
          className="sidebarFriendImg"
        ></img>
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    </ul>
  );
};

export default CloseFriend;
