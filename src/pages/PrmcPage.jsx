import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PrmcCard from "../components/PrmcCard";
import useTheaterStore from "../zustand/useTheatersStore";
import axiosInstance from "../api/axiosInstance";
import { useParams } from "react-router-dom";
const PrmcPage = () => {
  const apiKey = import.meta.env.VITE_SERVER_URL;

  const setSelectedTheater = useTheaterStore(
    (state) => state.setSelectedTheater
  );
  const { theaterId } = useParams();

  const [prmcList, setPrmcList] = useState([]);

  useEffect(() => {
    if (theaterId) {
      const getPrmc = async () => {
        try {
          const url = `/api/theaters/${theaterId}`;
          const response = await axiosInstance.get(url);
          setPrmcList(response.data.performances);
        } catch (error) {
          console.error("Error fetching performances", error);
        }
      };
      getPrmc();
    }
  }, [theaterId, setSelectedTheater]);

  return (
    <div>
      <Container>
        <Row>
          {prmcList.map((item) => {
            return (
              <Col key={item.mt20id} lg={3}>
                {item.prfnm}
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
