import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SportsCategories.scss";

const SportsCategories: React.FC = () => {
  return (
    <Container fluid className="m-0 p-5">
      <h2 className="text-center mb-4">다양한 종목</h2>
      <p className="text-center mb-5">
        대학생 운동 전문 플랫폼 중 종목수 1위 그리고 수천 명의 트레이너까지
      </p>
      <Row className="justify-content-center">
        <Col xs={2} md={2} className="text-center mb-3">
          <h5>성인</h5>
          <div className="list">유아체육</div>
          <div className="list">유아발레</div>
          <div className="list">유아수영</div>
          <div className="list">유아태권도</div>
        </Col>
        <Col xs={2} md={2} className="text-center mb-3">
          <h5>성인</h5>
          <div className="list">초등축구</div>
          <div className="list">초등농구</div>
          <div className="list">초등수영</div>
          <div className="list">초등태권도</div>
        </Col>
        <Col xs={2} md={2} className="text-center mb-3">
          <h5>성인</h5>
          <div className="list">고등축구</div>
          <div className="list">고등농구</div>
          <div className="list">고등수영</div>
          <div className="list">고등태권도</div>
        </Col>
        <Col xs={2} md={2} className="text-center mb-3">
          <h5>성인</h5>
          <div className="list">헬스</div>
          <div className="list">요가</div>
          <div className="list">필라테스</div>
          <div className="list">복싱</div>
        </Col>
        <Col xs={2} md={2} className="text-center mb-3">
          <h5>취미</h5>
          <div className="list">등산</div>
          <div className="list">자전거</div>
          <div className="list">달리기</div>
          <div className="list">피트니스</div>
        </Col>
      </Row>
    </Container>
  );
};

export default SportsCategories;
