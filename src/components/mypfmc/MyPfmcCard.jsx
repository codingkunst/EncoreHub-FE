import React from "react";
import Card from "react-bootstrap/Card";

// 좋아요한 공연 카드
const MyPfmcCard = () => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img className="w-auto h-auto" variant="top" src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMDlfMjIw%2FMDAxNjk2ODM2NzYyMTAw.lK2KTpgnTWkKvC3F7WxrMZJNYUmrVaGtPuqtzhIRNnEg.jHQDzqq_52dvxgxlxFXPbGof3ST1JmzTEKC0-t1_iM4g.JPEG.choi1127410%2F%25BD%25C3%25C4%25AB%25B0%25ED%25C6%25F7%25BD%25BA%25C5%25CD.jpg&type=sc960_832" alt="Loading..." />
      <Card.Body className="d-grid gap-2">
        <Card.Title>공연명 : item.prfnm</Card.Title>
        <Card.Text>공연중 : item.prfstate</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MyPfmcCard;
