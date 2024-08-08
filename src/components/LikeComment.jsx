import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillLike } from "react-icons/ai";

const LikeComment = () => {
  const apiKey = import.meta.env.VITE_EXAMPLE_SERVER_URL;

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  // 좋아요 수 READ
  useEffect(() => {
    axios
      .get(`${apiKey}/comments/1`)
      .then((response) => {
        setLikes(response.data.likes);
      })
      .catch((error) => {
        console.error("Error fetching likes:", error);
      });
  }, []);

  const onLikeHandler = () => {
    const newLike = liked ? likes - 1 : likes + 1;
    setLikes(newLike);
    setLiked(!liked);

    // 좋아요 수 UPDATE
    axios
      .patch(`${apiKey}/comments/1`, { likes: newLike })
      .catch((error) => {
        console.error("Error updating likes:", error);
      });
  };

  return (
    <div>
      <button className="border-none text-slate-500" onClick={onLikeHandler}>
        <AiFillLike /> {/* 좋아요 아이콘 */}
      </button>
      <span className="m-1.5 text-slate-500">{likes}</span>
    </div>
  );
};

export default LikeComment;
