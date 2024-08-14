import React, { useState, useEffect } from "react";
import useAuthStore from "../zustand/useAuthStore";
import axios from "axios";
import { AiFillLike } from "react-icons/ai";

const LikeComment = ({ commentId }) => {
  const apiKey = import.meta.env.VITE_SERVER_URL;

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // 인가
  const refreshToken = useAuthStore((state) => state.token); // 리프레쉬 토큰
  const accessToken = useAuthStore((state) => state.accessToken); // 유저 토큰

  const [likes, setLikes] = useState(0); // 댓글 좋아요 수
  const [liked, setLiked] = useState(false); // 댓글 좋아요 상태

  // 좋아요 수 조회
  useEffect(() => {
    const getLikes = async () => {
      try {
        const { data } = await axios.get(`${apiKey}/api/comment/likes/count`, {headers: {"Content-Type": "application/json", AccessToken: accessToken ? accessToken : undefined, RefreshToken: refreshToken ? refreshToken : undefined}});
        setLikes(data.data.likeCount);
      } catch (error) {
        console.error("댓글 좋아요 수 조회 실패:", error);
      }
    };
    getLikes();
  }, [refreshToken, accessToken]);

  const onLikeHandler = async () => {
    const newLike = liked ? likes - 1 : likes + 1;
    setLikes(newLike);
    setLiked(!liked);

    // 좋아요 수 UPDATE
    try {
      axios.post(`${apiKey}/api/comment/likes/toggle`, {commentId: commentId.id}, {headers: {"Content-Type": "application/json", AccessToken: accessToken ? accessToken : undefined, RefreshToken: refreshToken ? refreshToken : undefined}})
    } catch (error) {
        console.error("댓글 좋아요 업데이트 실패:", error);
    }
  };

  return (
    <div>
      <button className="text-slate-500" onClick={onLikeHandler}>
        <AiFillLike /> {/* 좋아요 아이콘 */}
      </button>
      <span className="m-1 text-slate-500">{likes}</span>
    </div>
  );
};

export default LikeComment;
