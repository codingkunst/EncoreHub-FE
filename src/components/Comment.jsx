import React, { useState, useEffect } from "react";
import axios from "axios";
import LikeComment from "./LikeComment";
import "./Comment.css";
import Stack from 'react-bootstrap/Stack';
import Button from "react-bootstrap/Button";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const Comment = () => {
  const apiKey = import.meta.env.VITE_EXAMPLE_SERVER_URL;
  
  const [comments, setComments] = useState([]); // 댓글 목록
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null); // 수정할 댓글 ID
  const [editComment, setEditComment] = useState(""); // 수정할 댓글 내용

  // 댓글 READ
  useEffect(() => {
    axios
      .get(`${apiKey}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  // 댓글 입력
  const onInputComment = (event) => {
    setNewComment(event.target.value);
  };

  // 댓글 CREATE
  const onSubmitComment = (event) => {
    event.preventDefault();
    if (newComment.trim() === "") return;

    axios
      .post(`${apiKey}/comments`, { text: newComment })
      .then((response) => {
        setComments([...comments, response.data]);
        setNewComment("");
      })
      .catch((error) => console.error("Error posting comment:", error));
  };

  // 댓글 DELETE
  const onDeleteComment = (id) => {
    axios
      .delete(`${apiKey}/comments/${id}`)
      .then(() => {
        setComments(comments.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("Error deleting comment:", error));
  };

  // 댓글 UPDATE 로드
  const loadEditForm = (id, text) => {
    setEditCommentId(id);
    setEditComment(text);
  };

  // 댓글 UPDATE 취소
  const cancelEdit = () => {
    setEditCommentId(null);
    setEditComment("");
  };

  // 댓글 UPDATE 완료
  const onEditComment = (id) => {
    axios
      .put(`${apiKey}/comments/${id}`, { text: editComment })
      .then((response) => {
        const updatedComments = comments.map((item) =>
          item.id === id ? response.data : item
        );
        setComments(updatedComments);
        setEditCommentId(null);
        setEditComment("");
      })
      .catch((error) => console.error("Error editing comment:", error));
  };

  return (
    <div className="comment-app">
      <form onSubmit={onSubmitComment} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={onInputComment}
          placeholder="댓글을 남겨보세요..."
          className="comment-input"
        />
        <button
          type="submit"
          className="ml-2.5 px-5 py-2.5 rounded-md bg-violet-500 text-white cursor-pointer hover:bg-violet-700"
        >
          등록
        </button>
      </form>
      {/* 댓글 수정 및 삭제 */}
      <ul className="comment-list">
        {comments.map((item) => (
          <li key={item.id} className="comment-item">
            {editCommentId === item.id ? (
              <Stack direction="horizontal" gap={3}>
                <input
                  type="text"
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  className="edit-comment-input"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => onEditComment(item.id)}
                  className="edit-comment-button"
                >
                  수정
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={cancelEdit}
                  className="cancel-edit-button"
                >
                  취소
                </Button>
              </Stack>
            ) : (
              <div>
                {item.text}
                <LikeComment /> {/* 댓글 좋아요 컴포넌트 */}
                <button
                  onClick={() => loadEditForm(item.id, item.text)}
                  className="edit-comment-button"
                >
                  <FaEdit /> {/* 수정 아이콘 */}
                </button>
                <button
                  onClick={() => onDeleteComment(item.id)}
                  className="comment-delete-button"
                >
                  <MdDeleteForever /> {/* 삭제 아이콘 */}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comment;
