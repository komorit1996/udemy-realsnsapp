import React, { useEffect, useState } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Timeline from "../../components/timeline/Timeline";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  // UserData Fetch
  const [user, setUser] = useState({});
  const username = useParams().username; // /profile/testuser003 にアクセスすることで username を取得する
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?username=${username}`); // query でユーザーIDを取得する
      setUser(response.data);
    };
    fetchUser();
  }, []);

  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={PUBLIC_FOLDER + `post/${user.convertPicturer}`}
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  PUBLIC_FOLDER + `person/${user.profilePicture}` ||
                  PUBLIC_FOLDER + "person/noAvatar.png"
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Timeline username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
