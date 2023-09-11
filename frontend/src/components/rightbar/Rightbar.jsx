import React from "react";
import "./Rightbar.css";
import { Users } from "../dummyData";
import Online from "../online/Online";

// Use 'profile' as a prop
const Rightbar = ({ user }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const HomeRightbar = () => {
    return (
      <>
        <div className="eventContainer">
          <img
            src={PUBLIC_FOLDER + "star.png"}
            alt=""
            className="starImg"
          ></img>
          <span className="eventText">
            <b>フォロワー限定イベント開催中！</b>
          </span>
        </div>
        <img
          src={PUBLIC_FOLDER + "event.jpeg"}
          alt=""
          className="eventImg"
        ></img>

        <h4 className="rightbarTitle">オンラインの友達</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online user={user} key={user.id} />
          ))}
        </ul>

        <div className="promotionTitle">
          プロモーション広告
          <img
            src={PUBLIC_FOLDER + "promotion/promotion1.jpeg"}
            alt=""
            className="rightbarPromotionImg"
          ></img>
          <p className="promotionName">ショッピング１</p>
          <img
            src={PUBLIC_FOLDER + "promotion/promotion2.jpeg"}
            alt=""
            className="rightbarPromotionImg"
          ></img>
          <p className="promotionName">Car Shop</p>
          <img
            src={PUBLIC_FOLDER + "promotion/promotion3.jpeg"}
            alt=""
            className="rightbarPromotionImg"
          ></img>
          <p className="promotionName">code株式会社</p>
        </div>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User Info</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">出身：</span>
            <span className="rightbarInfoKey">福岡</span>
          </div>
          <h4 className="rightbarTitle">Your friends</h4>
          <div className="rightbarFollowings">
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "person/1.jpeg"}
                alt=""
                className="rihgtbarFollowingImg"
              />
              <span className="rightbarFollowingName">komo code</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "person/3.jpeg"}
                alt=""
                className="rihgtbarFollowingImg"
              />
              <span className="rightbarFollowingName">komo code 2</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "person/4.jpeg"}
                alt=""
                className="rihgtbarFollowingImg"
              />
              <span className="rightbarFollowingName">komo code 3</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
