import React, { useState } from "react";
import ModalDetail from "./ModalDetail";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { toggleFavoritePfmc } from "../api/user";

const PrmcCard = ({ item, toggleFavoritePfmcHandler, fill }) => {
  // 모달 관련 코드
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="m-2.5">
      {/* 공연 목록 카드 */}
      <Card style={{ width: "18rem" }}>
        <Card.Img className="w-auto h-auto" variant="top" src={item?.poster} alt="Loading..." />
        <Card.Body className="d-grid gap-2">
          <Card.Title>공연명 : {item.prfnm}</Card.Title>
          <Card.Text>{item.prfstate}</Card.Text>
          <button onClick={toggleFavoritePfmcHandler}>
            좋아요 추가
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={fill}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          <Button variant="secondary" onClick={handleShow}>
            자세히 보기
          </Button>
        </Card.Body>
      </Card>

      {/* 모달 컴포넌트 */}
      <ModalDetail show={show} handleClose={handleClose} item={item} />
    </div>
  );
};

export default PrmcCard;
