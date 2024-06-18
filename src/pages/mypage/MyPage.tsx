import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import LoginedNavBar from "../../components/navbar/LoginedNavBar";
import NavMenuBar from "../../components/navbar/NavMenuBar";
import { handleTokenError } from "../../auth/tokenService";
import "./MyPage.scss";

interface ProfileData {
  userName: string;
  university: string;
  role: string;
  details: string;
  certifications: string;
  enrollment_status: string;
  exercises: string;
  major: string;
  rate: string;
}

interface PaymentData {
  ordNo: string;
  payPrice: string;
  trDay: string;
  trTime: string;
}

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileData, setProfileData] = useState<ProfileData>({
    userName: "",
    university: "",
    role: "",
    details: "",
    certifications: "",
    enrollment_status: "",
    exercises: "",
    major: "",
    rate: "",
  });

  const [paymentData, setPaymentData] = useState<PaymentData | null>(
    location.state?.paymentData || null
  );

  const [mentorName, setMentorName] = useState<string | null>(
    location.state?.mentorName || null
  );

  const fetchProfileData = useCallback(async (): Promise<void> => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인한 사용자만 이용 가능합니다!");
        navigate("/");
        return;
      }
      const roleResponse = await axios.get<string>(
        `${process.env.REACT_APP_BACKEND_URL}/api/check-user-role`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const role = roleResponse.data;

      setProfileData((prevState) => ({
        ...prevState,
        role: role,
      }));

      if (role !== "ROLE_NEW") {
        const profileResponse = await axios.get<ProfileData>(
          `${process.env.REACT_APP_BACKEND_URL}/api/${
            role === "ROLE_MENTOR" ? `mentor-profile` : `mentee-profile`
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const profileData = profileResponse.data;
        setProfileData({
          userName: profileData.userName,
          university: profileData.university,
          role: profileData.role,
          details: profileData.details,
          certifications: profileData.certifications,
          enrollment_status: profileData.enrollment_status,
          exercises: profileData.exercises,
          major: profileData.major,
          rate: profileData.rate,
        });
      }
    } catch (error) {
      await handleTokenError(error, fetchProfileData);
    }
  }, [navigate]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  return (
    <>
      <LoginedNavBar />
      <NavMenuBar />
      <Container className="my-page mt-4">
        <Row>
          <Col md={3}>
            <Card className="profile-card mb-4 align-items-center">
              <div className="d-flex justify-content-end w-100">
                <Button
                  variant=""
                  className="m-2"
                  size="sm"
                  style={{ border: "1px solid rgba(0, 0, 0, 0.175)" }}
                >
                  정보 수정
                </Button>
              </div>
              <Card.Body className="align-items-center p-0">
                <div className="text-center">
                  <img
                    src="../common/profile.webp"
                    alt="profile"
                    className="user-image m-0"
                  />
                  <Card.Title>{profileData.userName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {profileData.university}
                  </Card.Subtitle>
                  <Badge bg="success m-0">
                    {profileData.role === "ROLE_MENTOR" ? "트레이너" : "수강생"}
                  </Badge>
                  {profileData.enrollment_status}
                </div>
              </Card.Body>
            </Card>
            <Card className="mb-4 p-2 d-flex flex-row align-items-center">
              <img
                src="../icons/diamond.svg"
                alt="start"
                className="diamond-image mr-2"
              />
              <Card.Text className="ml-2">멤버십 Lv.0</Card.Text>
            </Card>
            <ListGroup>
              <ListGroup.Item action href="#">
                과외 성사등록 안내
              </ListGroup.Item>
              <ListGroup.Item action href="#">
                성사등록 가이드
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={9}>
            <Card className="mb-4">
              <Card.Header>모집글</Card.Header>
              <Card.Body>
                {profileData.details}{" "}
                <Button variant="outline-primary">수정하기</Button>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Header>매칭 내역</Card.Header>
              <Card.Body className="d-flex justify-content-between align-items-center">
                수강생과 매칭이 성사 되었나요??
                <br />첫 수업일 전까지 과외 성사등록을 완료해주세요!
                <Button variant="outline-primary">바로가기</Button>
              </Card.Body>
            </Card>
            {paymentData && (
              <Card className="mb-4">
                <Card.Header>결제 내역</Card.Header>
                <Card.Body>
                  <p>
                    <strong>주문 번호:</strong> {paymentData.ordNo}
                  </p>
                  <p>
                    <strong>결제 금액:</strong> {paymentData.payPrice} 원
                  </p>
                  <p>
                    <strong>결제 날짜:</strong> {paymentData.trDay}
                  </p>
                  <p>
                    <strong>결제 시간:</strong> {paymentData.trTime}
                  </p>
                  {mentorName && (
                    <p>
                      <strong>멘토 이름:</strong> {mentorName}
                    </p>
                  )}
                </Card.Body>
              </Card>
            )}
            <Card className="mb-4">
              <Card.Header>멤버십</Card.Header>
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  더 많은 과외와 상담요청을 받고 싶으신가요? <br />
                  선생님 목록 상단에 노출되는 방법을 확인해보세요
                </div>
                <Button variant="outline-primary">바로가기</Button>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Header>증명서류 관리</Card.Header>
              <Card.Body>{profileData.certifications}</Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Header>레벨별 혜택안내</Card.Header>
              <Card.Body>레벨별 혜택안내 내용</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyPage;
