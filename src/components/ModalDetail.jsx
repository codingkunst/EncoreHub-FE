import React, { useEffect, useState } from "react";
import useAuthStore from "../zustand/useAuthStore";
import ReactDOM from "react-dom";
import axios from "axios";
import LikeAndFavorite from "./LikeAndFavorite";
import LikeComment from "./LikeComment";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const ModalDetail = ({ show, handleClose, item }) => {
  const apiKey = import.meta.env.VITE_SERVER_URL;

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // 인가
  const refreshToken = useAuthStore((state) => state.token); // 리프레쉬 토큰
  const accessToken = useAuthStore((state) => state.accessToken); // 유저 토큰

  const [comments, setComments] = useState([]); // 댓글 목록
  const [newComment, setNewComment] = useState("");

  // 댓글 READ
  useEffect(() => {
    const getComment = async () => {
      try {
        const { data } = await axios.get(`${apiKey}/api/comments/performance/${item.mt20id}`, {headers: {"Content-Type": "application/json", AccessToken: accessToken ? accessToken : undefined, RefreshToken: refreshToken ? refreshToken : undefined,}});
        console.log("data 확인: ", data);
        setComments(data.data);
      } catch (error) {
        console.error("댓글 조회 실패", error);
      }
    };
    console.log("comments : ", comments);
    getComment();
  }, [refreshToken, accessToken]);

  // 댓글 입력
  const onInputComment = (event) => {
    setNewComment(event.target.value);
  };

  // 댓글 CREATE
  const onSubmitComment = (event) => {
    event.preventDefault();
    if (newComment.trim() === "") return;

    if (!isAuthenticated) {
      alert("로그인하고 댓글에 참여해보세요!");
      return;
    }

    axios
      .post(`${apiKey}/api/comments`, {mt20id: item.mt20id, content: newComment, parentCommentId: null }, {headers: {"Content-Type": "application/json", AccessToken: accessToken ? accessToken : undefined, RefreshToken: refreshToken ? refreshToken : undefined}})
      .then((response) => {
        console.log('response 확인: ', response)
        setComments([...comments, response.data.data]);
        setNewComment("");
      })
      .catch((error) => {
        console.error("댓글 작성 실패:", error);
        setNewComment("");
      });
  };

  // 댓글 DELETE
  const onDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${apiKey}/api/comments/${commentId}`, {headers: {"Content-Type": "application/json", AccessToken: accessToken ? accessToken : undefined, RefreshToken: refreshToken ? refreshToken : undefined}})
      setComments(comments.filter((item) => item.id !== commentId));
    } catch (error) {
      console.error("댓글 삭제 실패:", error)
    }
  };

  return ReactDOM.createPortal(
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>✨공연 정보✨</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={item.img} alt="Loading..." />
        <p className="mt-2.5">공연명 : {item.prfnm}</p>
        <p className="mt-2">공연 시작일 : {item.prfpdfrom}</p>
        <p className="mt-2">공연 종료일 : {item.prfpdto}</p>
        <p className="mt-2">공연장: {item.fcltynm}</p>
        <p className="mt-2">공연 런타임 : {item.prfruntime}</p>
        <p className="mt-2">공연 시간 : {item.dtguidance}</p>
        <p className="mt-2">관람 연령 : {item.prfage}</p>
        <p className="mt-2">장르 : {item.genrenm}</p>
        <p className="mt-2 mb-2.5">티켓 가격 : {item.pcseguidance}</p>
        {/* 좋아요, 즐겨찾기 컴포넌트 */}
        {/* <LikeAndFavorite mt20id={item.mt20id} /> */}
        <br />
        <hr className="border-2" />
        <br />
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>🎯 공연 리뷰</Form.Label>
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
        <h2 className="mt-2.5 mb-2.5 bg-violet-100">🎯 작성한 공연 리뷰 나오는 곳</h2>
        {comments.map((item) => {
          return (
            <div key={item.id} className="mb-2.5 p-2.5 rounded border-2 border-gray-400 border-solid bg-stone-100 flex space-x-2.5">
              {/* 댓글 목록 */}
              <p className="text-justify">{item.content} <LikeComment commentId={item} /></p>
              
              {/* 댓글 수정 버튼 */}
              <button><FaEdit /></button>
              
              {/* 댓글 삭제 버튼 */}
              <button onClick={() => onDeleteComment(item.id)}>
                <MdDeleteForever />
              </button>
            </div>
          );
        })}
      </Modal.Footer>
    </Modal>,
    document.getElementById("modal-root")
  );
};

export default ModalDetail;
