import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "../components/Modal";
import LikeAndFavorite from "../components/LikeAndFavorite";
import Comment from "../components/Comment";
import axios from "axios";
import PrmcCard from "../components/PrmcCard";

const PrmcPage = () => {
  const apiKey = import.meta.env.VITE_EXAMPLE_SERVER_URL;

  // const [prmc, setPrmc] = useState([]);
  const [prmcList, setPrmcList] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedConcert, setSelectedConcert] = useState(null);

  const getPrmc = async () => {
    let url = `${apiKey}/products`;
    let response = await fetch(url);
    let data = await response.json();
    setPrmcList(data);
  };

  useEffect(() => {
    getPrmc();
  }, []);

  // 데이터 READ
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/concerts")
  //     .then((response) => {
  //       setPrmc(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  // const openModal = (concert) => {
  //   setSelectedConcert(concert);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <div>
      <Container>
        <Row>
          {prmcList.map((item) => {
            return (
              <Col key={item.id} lg={3}>
                <PrmcCard item={item} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>

    // <StyledContainer>
    //   <h1 className="rounded-md border border-solid border-violet-500 w-auto h-auto m-4">
    //     공연 정보
    //   </h1>
    //   <StyledPrmcArea>
    //     {prmc.map((item) => (
    //       <StyledPrmcCard key={item.id}>
    //         <div>공연 포스터</div>
    //         <ConcertTitle>{item.title}</ConcertTitle>
    //         <ConcertDetail>{item.date}</ConcertDetail>
    //         <ConcertDetail>{item.location}</ConcertDetail>
    //         <StyledDetailButton onClick={() => openModal(item)}>
    //           상세정보
    //         </StyledDetailButton>
    //       </StyledPrmcCard>
    //     ))}
    //   </StyledPrmcArea>

    //   {isModalOpen && selectedConcert && (
    //     <Modal onClose={closeModal}>
    //       <StyledModalContent>
    //         <h2>{selectedConcert.title}</h2>
    //         <p>날짜: {selectedConcert.date}</p>
    //         <p>장소: {selectedConcert.location}</p>
    //       </StyledModalContent>
    //       {/* 좋아요 and 즐겨찾기 */}
    //       <LikeAndFavorite />
    //       {/* 댓글 CRUD */}
    //       <Comment />
    //     </Modal>
    //   )}
    // </StyledContainer>
  );
};

export default PrmcPage;

// 스타일 컴포넌트
// const StyledContainer = styled.div`
//   text-align: center;
// `;

// const StyledPrmcArea = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
// `;

// const StyledPrmcCard = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   padding: 20px;
//   margin: 20px;
//   width: 300px;
//   height: 400px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// const ConcertTitle = styled.h2`
//   font-size: 1.5em;
//   margin-bottom: 16px;
// `;

// const ConcertDetail = styled.p`
//   margin: 8px 0;
// `;

// const StyledDetailButton = styled.button`
//   background-color: #8b5cf6;
//   border: none;
//   color: white;
//   padding: 10px 20px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 16px;
//   margin: 4px 2px;
//   cursor: pointer;
//   border-radius: 4px;
// `;

// const StyledModalContent = styled.div`
//   h2 {
//     color: #333;
//     margin-bottom: 20px;
//   }

//   p {
//     margin: 10px 0;
//     font-size: 16px;
//   }
// `;
