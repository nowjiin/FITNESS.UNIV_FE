import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Logo from "../common/Logo";

import "./SocialLogin.scss";

function SocialLogin() {
  return (
    <Container className="social-login">
      <Row className="justify-content-center">
        <Col xs={12} sm={6} className="text-center">
          <Logo /> {/* Logo 컴포넌트 사용 */}
          <h2>로그인 / 회원가입</h2>
          <p>SNS 계정으로 간편하게 시작하기</p>
          <Button variant="outline-danger" className="social-button mb-3">
            구글로 시작하기
          </Button>
          <Button variant="warning" className="social-button mb-3">
            카카오 로그인
          </Button>
          <Button variant="success" className="social-button mb-3">
            네이버 로그인
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
export default SocialLogin;
