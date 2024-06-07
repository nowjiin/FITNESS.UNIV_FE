import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SportsCategories: React.FC = () => {
  return (
    <Container className="my-5 text-center">
      <h2 className="text-center mb-4">다양한 종목</h2>
      <p className="text-center mb-5">대학생 운동 전문 플랫폼 중 종목수 1위 그리고 수천 명의 트레이너까지</p>
      <Row className="justify-content-center">
        <Col xs={10} md={2} className="text-center mb-3">
          <div className="categories-title">헬스</div>
          <div>유아체육</div>
          <div>유아발레</div>
          <div>유아수영</div>
          <div>유아태권도</div>
        </Col>
        <Col xs={10} md={2} className="text-center mb-3">
        <div className="categories-title">헬스</div>
          <div>초등축구</div>
          <div>초등농구</div>
          <div>초등수영</div>
          <div>초등태권도</div>
        </Col>
        <Col xs={10} md={2} className="text-center mb-3">
        <div className="categories-title">헬스</div>
          <div>고등축구</div>
          <div>고등농구</div>
          <div>고등수영</div>
          <div>고등태권도</div>
        </Col>
        <Col xs={10} md={2} className="text-center mb-3">
          <div className="categories-title">헬스</div>
          <div>헬스</div>
          <div>요가</div>
          <div>필라테스</div>
          <div>복싱</div>
        </Col>
        <Col xs={10} md={2} className="text-center mb-3">
          <div className="categories-title">헬스</div>
          <div>등산</div>
          <div>자전거</div>
          <div>달리기</div>
          <div>피트니스</div>
        </Col>
      </Row>
    </Container>
  );
};

export default SportsCategories;
