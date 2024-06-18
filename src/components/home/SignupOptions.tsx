import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./SignupOptions.scss";

const SignupOptions: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <Container fluid className="m-0 p-5 bg-gray-100 h-100">
      <h2 className="text-center mb-4 responsive-text">
        이제, 1분 만에 회원가입하고 나에게 딱 맞는 트레이너를 만나보세요
      </h2>
      <Row className="justify-content-center align-items-stretch h-100">
        <Col xs={12} md={6} className="d-flex justify-content-center mb-3">
          <Card
            className="card-green-bg w-100 d-flex flex-column flip-card"
            onClick={() => handleCardClick("/mentee")}
          >
            <Card.Body className=" d-flex flex-column flip-card-inner">
              <div className="flip-card-front">
                <div>
                  <Card.Text className="mb-3 card-text-sm responsive-text">
                    나에게 딱 맞는 선생님을 추천받고 싶다면?
                  </Card.Text>
                  <Card.Text className="mb-3 card-text-sm responsive-text">
                    1분만에 회원가입하고 맞춤 제안 받아보기
                  </Card.Text>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-auto">
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
                </div>
              </div>
              <div className="flip-card-back">
                <p className="back-title">수강생 등록하기</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-center mb-3">
          <Card
            className="card-blue-bg w-100 d-flex flex-column flip-card"
            onClick={() => handleCardClick("/mentor")}
          >
            <Card.Body className="d-flex flex-column flip-card-inner">
              <div className="flip-card-front">
                <div>
                  <Card.Text className="mb-3 card-text-sm responsive-text">
                    나에게 딱 맞는 트레이너를 직접 찾아보고 싶다면?
                  </Card.Text>
                  <Card.Text className="mb-3 card-text-sm responsive-text">
                    1분만에 회원가입하고 트레이너 직접 찾아보기
                  </Card.Text>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-auto">
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
                </div>
              </div>
              <div className="flip-card-back">
                <p className="back-title">트레이너 등록하기</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupOptions;
