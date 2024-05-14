import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Logo from "../common/Logo";

import "./SocialLogin.scss";

function SocialLogin() {
  const handleLogin = (url: string) => {
    window.location.href = url; // Redirect될 OAuth url
  };
  return (
    <Container className="social-login">
      <Row className="justify-content-center">
        <Col xs={12} sm={6} className="text-center">
          <Logo />
          <h2>로그인 / 회원가입</h2>
          <p>SNS 계정으로 간편하게 시작하기</p>
          <Button
            variant="outline-danger"
            className="social-button mb-3"
            onClick={() =>
              handleLogin("http://localhost:8080/oauth2/authorization/google")
            }>
            구글로 시작하기
          </Button>
          <Button
            variant="success"
            className="social-button mb-3"
            onClick={() =>
              handleLogin("http://localhost:8080/oauth2/authorization/naver")
            }>
            네이버 로그인
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
export default SocialLogin;
