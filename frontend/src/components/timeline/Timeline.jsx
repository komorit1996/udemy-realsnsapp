import React, { useContext, useEffect, useState } from "react";
import "./Timeline.css";
import Share from "../share/Share";
import Post from "../../components/post/post";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

const Timeline = ({ username }) => {
  // const BACKEND_SERVER = process.env.BACKEND_SERVER;
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext); // 現在のユーザーの状態を利用する

  // 第二引数が空の場合は読み込み時に一度だけ読み込まれる
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // uername あり：自分の投稿のみ表示、なし：自分とフォローしているユーザーの投稿を取得する
        const response = username
          ? await axios.get(`/posts/timeline/current/${username}`)
          : await axios.get(`/posts/timeline/${user._id}`);
        // 投稿されたデータを作成日順にソートする
        setPosts(
          response.data.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
          })
        );
      } catch (err) {
        console.error("error", err);
      }
    };
    fetchPosts();
  }, [username]);

  return (
    <div className="Timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
