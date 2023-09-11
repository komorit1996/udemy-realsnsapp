import React from "react";

const Online = ({ user }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <ul className="rightbarFriendsList">
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            src={PUBLIC_FOLDER + user.profilePicture}
            alt=""
            className="rightbarProfileImg"
          ></img>
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUserName">{user.username}</span>
      </li>
    </ul>
  );
};

export default Online;
