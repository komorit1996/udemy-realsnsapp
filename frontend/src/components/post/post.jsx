import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState, useEffect, useContext } from "react";
// user data を別から呼び出す
// import { Users } from "../dummyData";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

const Post = ({ post }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext); // 現在のユーザーの状態を利用する\

  // ↓↓ DEL LikeはAPiで更新するので削除
  // Like を取得する
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  // ↑↑ DEL LikeはAPiで更新するので削除

  // Likeを押したときの動作
  const handleLike = async () => {
    try {
      // 既にlike が押されていれば-1、これからの場合は +1する。
      // ↓↓ API で直接更新する
      await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
      // await axios.post("/posts/64f40bd9deb7a815afb1945b/like", {userId: "64f40b89deb7a815afb19456",});
      // ↑↑ API で直接更新する
    } catch (err) {
      console.log(err);
    }
  };

  // ユーザーの情報を取得する
  // 第二引数が空の場合は読み込み時に一度だけ読み込まれる
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?userId=${post.userId}`); // prpos で userIdを受け取る
      setUser(response.data);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  PUBLIC_FOLDER + `person/${user.profilePicture}` ||
                  PUBLIC_FOLDER + "person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUserName">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img
            src={PUBLIC_FOLDER + `post/${post.img}`}
            alt=""
            className="postImg"
          />
        </div>
        <div className="postBottom">
          <div className="postButtomLeft">
            <img
              src={PUBLIC_FOLDER + "heart.png"}
              alt=""
              className="likeIcon"
              onClick={() => handleLike()}
            />
            <span className="postLikeCounter">{post.likes.length} Likes</span>
          </div>
          <div className="postButtomRight">
            <span className="postCommentText">comment text</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
