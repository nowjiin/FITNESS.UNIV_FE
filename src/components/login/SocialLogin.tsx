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
            className="social-button mb-3 google-button"
            onClick={() =>
              handleLogin(process.env.REACT_APP_GOOGLE_LOGIN_URL as string)
            }
          >
            <img
              src="/login-logo/google/google_login_btn.png"
              alt="구글 로그인"
              className="google-login-btn"
            />
          </Button>
          <Button
            className="social-button mb-3 naver-button"
            onClick={() =>
              handleLogin(process.env.REACT_APP_NAVER_LOGIN_URL as string)
            }
          >
            <img
              src="/login-logo/naver/naver_login_btn.png"
              alt="네이버 로그인"
              className="naver-login-btn"
            />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
export default SocialLogin;
