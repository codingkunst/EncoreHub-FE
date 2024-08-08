import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PrmcCard from "../components/PrmcCard";

const PrmcPage = () => {
  const apiKey = import.meta.env.VITE_SERVER_URL;

  const [prmcList, setPrmcList] = useState([]);

  // 데이터 READ
  const getPrmc = async () => {
    let url = `${apiKey}/api/pfmc`;
    let response = await fetch(url);
    let data = await response.json();
    setPrmcList(data);
  };

  useEffect(() => {
    getPrmc();
  }, []);

  return (
    <div>
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
