import React, { useEffect, useState } from "react";
import useAuthStore from "../zustand/useAuthStore";
import "./LikeAndFavorite.css";
import axios from "axios";

const LikeAndFavorite = ({ mt20id }) => {
  const apiKey = import.meta.env.VITE_SERVER_URL;
  
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // 인가
  const refreshToken = useAuthStore((state) => state.token); // 리프레쉬 토큰
  const accessToken = useAuthStore((state) => state.accessToken); // 유저 토큰
  
  const [isLike, setIsLike] = useState(false); // 좋아요 상태
  const [isFavorite, setIsFavorite] = useState(false); // 즐겨찾기 상태

  // 좋아요 상태 조회
  const getLike = async () => {
    try {
      const { data } = await axios.get(`${apiKey}/api/likes/mypage/performances/`, {headers: {"Content-Type": "application/json", AccessToken: accessToken ? accessToken : undefined, RefreshToken: refreshToken ? refreshToken : undefined }});
      setIsLike(data.data.liked);
    } catch (error) {
      console.error("좋아요 상태 조회 실패 : ", error);
    }
  };

  // 좋아요 상태 변경
  const onLikeHandler = async () => {
    try {
      setIsLike(!isLike);
      await axios.post(`${apiKey}/api/likes/toggle`, {mt20id: mt20id}, {headers: {"Content-Type": "application/json", AccessToken: accessToken ? accessToken : undefined, RefreshToken: refreshToken ? refreshToken : undefined }});
    } catch (error) {
      console.error("좋아요 상태 변경 실패 : ", error);
      setIsLike(isLike);
    }
  };

  // 즐겨찾기 상태 조회
  const getFavorite = async () => {
    try {
      const { data } = await axios.get(`${apiKey}/api/favorite-pfmc/favorites`, {headers: {"Content-Type": "application/json", AccessToken: accessToken ? accessToken : undefined, RefreshToken: refreshToken ? refreshToken : undefined }});
      setIsFavorite(data.favorited);
    } catch (error) {
      console.error("즐겨찾기 상태 조회 실패 : ", error);
    }
  };

  // 즐겨찾기 상태 변경
  const onFavoriteHandler = async () => {
    try {
      setIsFavorite(!isFavorite);
      await axios.post(`${apiKey}/api/favorite-pfmc/toggle`, {performanceId: mt20id}, {headers: {"Content-Type": "application/json", AccessToken: accessToken ? accessToken : undefined, RefreshToken: refreshToken ? refreshToken : undefined }});
    } catch (error) {
      console.error("즐겨찾기 상태 변경 실패 : ", error);
      setIsFavorite(isFavorite);
    }
  };

  useEffect(() => {
    getLike();
    getFavorite();
  }, [refreshToken, accessToken]);

  return (
    <div className="flex justify-stretch">
      <button
        className={`like-button ${isLike ? "active" : ""}`}
        onClick={onLikeHandler}
        disabled={!isAuthenticated}
      >
        {isLike ? "❤️" : "🤍"} 좋아요
      </button>
      <button
        className={`favorite-button ${isFavorite ? "active" : ""}`}
        onClick={onFavoriteHandler}
        disabled={!isAuthenticated}
      >
        {isFavorite ? "★" : "☆"} 즐겨찾기
      </button>
    </div>
  );
};

export default LikeAndFavorite;
