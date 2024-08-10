import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import LikeAndFavorite from "./LikeAndFavorite";
import Comment from "./Comment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const ModalDetail = ({ show, handleClose, item }) => {
  const apiKey = import.meta.env.VITE_EXAMPLE_SERVER_URL;

  const [comments, setComments] = useState([]); // 댓글 목록
  const [newComment, setNewComment] = useState("");

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

  return ReactDOM.createPortal(
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>공연-상세정보</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={item.img} alt="Loading..." />
        <p>공연명</p>
        <p>공연 시작</p>
        <p>공연 장소</p>
        <p>공연 끝</p>
        <p>티켓팅 링크</p>
        <LikeAndFavorite /> {/* 좋아요, 즐겨찾기 컴포넌트 */}
        <Comment /> {/* 댓글 컴포넌트 */}
        <br />
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>공연 리뷰</Form.Label>
            <Form.Control
              type="text"
              placeholder="댓글을 남겨보세요..."
              as="textarea"
              rows={2}
              autoFocus
              value={newComment}
              onChange={onInputComment}
            />
            <Button
              variant="secondary"
              className="mt-2"
              onClick={onSubmitComment}
            >
              등록
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <span>공연 리뷰</span>
        </Container>
        {/* {comments.map((item) => {
          return (
            <div
              key={item.id}
              className="mb-2.5 p-2.5 rounded border-2 border-gray-400 border-solid bg-stone-100"
            >
              <p>{item.text}</p>
            </div>
          );
        })} */}
      </Modal.Footer>
    </Modal>,
    document.getElementById("modal-root")
  );
};

export default ModalDetail;
