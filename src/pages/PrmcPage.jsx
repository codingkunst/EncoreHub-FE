import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import useTheaterStore from "../zustand/useTheatersStore";
import PrmcCard from "../components/PrmcCard";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const PrmcPage = () => {
  const { theaterId } = useParams(); // 공연장 id
  const [prmcList, setPrmcList] = useState([]); // 공연 목록 상태

  const setSelectedTheater = useTheaterStore(
    (state) => state.setSelectedTheater
  );

  // 공연 데이터 READ
  useEffect(() => {
    if (theaterId) {
      const getPrmc = async () => {
        try {
          const url = `/api/theaters/${theaterId}`;
          const response = await axiosInstance.get(url);
          return setPrmcList(response.data.performances);
        } catch (error) {
          console.error("공연 데이터 조회 실패: ", error);
        }
      };
      getPrmc();
    }
  }, [theaterId, setSelectedTheater]);

  return (
    <div>
      <h1>공연 목록</h1>
      <Container>
        <Row>
          {prmcList.map((item) => {
            return (
              <Col key={item.mt20id} lg={3}>
                <PrmcCard item={item} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default PrmcPage;
