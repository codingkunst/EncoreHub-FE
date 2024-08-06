import React, { useState } from "react";
import "./LikeAndFavorite.css";

const LikeAndFavorite = () => {
  
  const [isLike, setIsLike] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const onLikeHandler = () => {
    setIsLike(!isLike);
  };

  const onFavoriteHandler = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <button
        className={`like-button ${isLike ? "active" : ""}`}
        onClick={onLikeHandler}
      >
        {isLike ? "❤️" : "🤍"} 좋아요
      </button>
      <button
        className={`favorite-button ${isFavorite ? "active" : ""}`}
        onClick={onFavoriteHandler}
      >
        {isFavorite ? "★" : "☆"} 즐겨찾기
      </button>
    </div>
  );
};

export default LikeAndFavorite;
