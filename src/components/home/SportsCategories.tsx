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
        대학생 운동 전문 플랫폼 다양한 종목 그리고 다양한 트레이너까지
      </p>
      <Row className="justify-content-center no-wrap">
        <Col xs={12} sm={4} md={2} className="text-center mb-3">
          <h5>헬스</h5>
          <div className="list">다이어트</div>
          <div className="list">근력강화</div>
          <div className="list">체력증진</div>
          <div className="list">바디프로필</div>
        </Col>
        <Col xs={12} sm={4} md={2} className="text-center mb-3">
          <h5>골프</h5>
          <div className="list">스크린골프</div>
          <div className="list">필드 골프</div>
          <div className="list">입문/기초 레슨</div>
        </Col>
        <Col xs={12} sm={4} md={2} className="text-center mb-3">
          <h5>필라테스</h5>
          <div className="list">필라테스/체형교정</div>
          <div className="list">기구 필라테스</div>
          <div className="list">메트 필라테스</div>
        </Col>
        <Col xs={12} sm={4} md={2} className="text-center mb-3">
          <h5>요가</h5>
          <div className="list">플라잉 요가</div>
          <div className="list">일반요가</div>
          <div className="list">핫 요가</div>
        </Col>
        <Col xs={12} sm={4} md={2} className="text-center mb-3">
          <h5>취미</h5>
          <div className="list">테니스</div>
          <div className="list">클라이밍</div>
          <div className="list">골프</div>
          <div className="list">피트니스</div>
        </Col>
      </Row>
    </Container>
  );
};

export default SportsCategories;
