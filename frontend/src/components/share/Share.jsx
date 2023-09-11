import React, { useContext, useRef, useState } from "react";
import "./Share.css";
import { Analytics, Face, Gif, Photo } from "@mui/icons-material";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";

const Share = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext); // 現在のユーザーの状態を利用する

  const shareInput = useRef();

  // ファイル投稿操作
  const [file, setFile] = useState(null);
  console.log(file);

  const handleSubmit = async (e) => {
    e.preventDefault();


    let fileName = ""; // fileName を定義
    // ファイルの投稿を取得
    if (file) {
      const data = new FormData();
      fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      try {
        await axios.post("/upload", data);
        // ファイルのアップロードが成功したら、fileName を設定
      } catch (err) {
        console.log(err);
      }
    }
    
    // 最終的な投稿データ
    const postData = {
      userId: user._id,
      desc: shareInput.current.value,
      img: fileName, // fileName を使用
    };

    try {
      // Create Post API
      await axios.post("/posts", postData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="Share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={PUBLIC_FOLDER + `person/${user.profilePicture}`}
            alt=""
            className="shareProfileImg"
          />
          <input
            className="shareInput"
            placeholder="What are you doing now?"
            required
            ref={shareInput}
          />
          <hr className="shareHr" />
        </div>
        <form className="shareButtons" onSubmit={(e) => handleSubmit(e)}>
          <div className="shareOptions">
            <label className="shareOption" htmlFor="file">
              <Photo className="shareIcon" htmlColor="blue"></Photo>
              <span className="shareOptionText">Photo</span>
              <input
                type="file"
                id="file"
                accept=".png,.jpeg,.img,.jpg"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Gif className="shareIcon" htmlColor="red"></Gif>
              <span className="shareOptionText">GIF</span>
            </div>
            <div className="shareOption">
              <Face className="shareIcon" htmlColor="green"></Face>
              <span className="shareOptionText">kimochi</span>
            </div>
            <div className="shareOption">
              <Analytics className="shareIcon" htmlColor="purple"></Analytics>
              <span className="shareOptionText">Poll</span>
            </div>
          </div>
          <button type="submit" className="postButton">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
