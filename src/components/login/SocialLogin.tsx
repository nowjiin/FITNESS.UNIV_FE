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
  const handleGoogleLogin = () => {
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}
		&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}
		&response_type=code
		&scope=email profile`;
    window.location.href = googleLoginUrl;
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
            onClick={handleGoogleLogin}
          >
            구글로 시작하기
          </Button>
          <Button
            variant="success"
            className="social-button mb-3"
            onClick={() =>
              handleLogin(process.env.REACT_APP_NAVER_LOGIN_URL as string)
            }
          >
            네이버 로그인
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
export default SocialLogin;
