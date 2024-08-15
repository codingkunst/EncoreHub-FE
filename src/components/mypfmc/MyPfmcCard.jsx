import React from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

// 좋아요 및 즐겨찾기한 공연 카드
const MyPfmcCard = ({ item }) => {
  return (
    <div className="m-2.5">
      <Card style={{ width: "18rem" }}>
        <Card.Img className="w-auto h-auto" variant="top" src={item.poster} alt="Loading..."/>
        <Card.Body className="d-grid gap-2">
          <Card.Title>공연명 : {item.prfnm}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyPfmcCard;
