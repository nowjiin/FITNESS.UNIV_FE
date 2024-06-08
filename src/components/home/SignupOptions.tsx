import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./SignupOptions.scss";

const SignupOptions: React.FC = () => {
  return (
    <Container fluid className="m-0 p-5 bg-gray-100">
      <h2 className="text-center mb-4 responsive-text">
        이제, 1분 만에 회원가입하고 나에게 딱 맞는 트레이너를 만나보세요
      </h2>
      <Row className="justify-content-center align-items-center">
        <Col xs={6} md={6} className="d-flex justify-content-center mb-1">
          <Card className="card-green-bg w-100">
            <Card.Body>
              <Card.Title className="mb-3 responsive-text">
                나에게 딱 맞는 선생님을 추천받고 싶다면?
              </Card.Title>
              <Card.Text className="mb-3 card-text-sm">
                1분만에 회원가입하고 맞춤 제안 받아보기
              </Card.Text>
              <Button variant="">
                <img
                  src="./main/icon-green-btn.png"
                  alt="green button icon"
                  style={{ width: "20px", height: "20px" }}
                />
              </Button>
              <img
                src="./main/airplane.png"
                alt="green button icon"
                className="plane-img"
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={6} className="d-flex justify-content-center mb-1">
          <Card className="card-blue-bg w-100">
            <Card.Body>
              <Card.Title className="mb-3 responsive-text">
                나에게 딱 맞는 트레이너를 직접 찾아보고 싶다면?
              </Card.Title>
              <Card.Text className="mb-3 card-text-sm">
                1분만에 회원가입하고 트레이너 직접 찾아보기
              </Card.Text>
              <Button variant="">
                <img
                  src="./main/icon-blue-btn.png"
                  alt="blue button icon"
                  style={{ width: "20px", height: "20px" }}
                />
              </Button>
              <img
                src="./main/profile-img.png"
                alt="profile"
                className="profile-img"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupOptions;
