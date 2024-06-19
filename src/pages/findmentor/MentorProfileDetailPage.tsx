import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { getToken, handleTokenError } from "../../auth/tokenService";
import { MentorProfile } from "../../components/findmentor/MentorProfile";
import LoginedNavBar from "../../components/navbar/LoginedNavBar";
import NavMenuBar from "../../components/navbar/NavMenuBar";
import MentorDetailCard from "../../components/findmentor/MentorDetailCard";
import ChatButtonMentor from "../../components/common/ChatButtonMentor";

const MentorProfileDetailPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [mentor, setMentor] = useState<MentorProfile | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentorDetail = async () => {
      if (!id) {
        alert("잘못된 접근입니다. 메인 페이지로 이동합니다.");
        navigate("/");
        return;
      }

      try {
        const token = getToken();
        if (!token) {
          alert("로그인한 사용자만 이용 가능합니다! 로그인해주세요!");
          navigate("/");
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/mentor/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMentor(response.data);
      } catch (error) {
        await handleTokenError(error, fetchMentorDetail);
      }
    };

    fetchMentorDetail();

    const handleMessage = async (event: MessageEvent) => {
      if (event.data.type === "navigate_to_mypage") {
        const paymentDetails = event.data.paymentDetails || {};
        paymentDetails.mentorUserName = mentor?.userName;
        paymentDetails.mentorId = id;
        console.log("Updated Payment Details:", paymentDetails);

        try {
          const token = getToken();
          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/payment/approval`,
            paymentDetails,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          navigate("/Mypage", { state: { mentorId: id } });
        } catch (error) {
          console.error("Payment approval error:", error);
          alert("결제 승인 요청에 실패했습니다.");
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [id, navigate, mentor?.userName, userId]);

  if (!mentor) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <LoginedNavBar />
      <NavMenuBar />
      <Container className="mentor-profile-detail-page mt-4">
        <Row>
          <Col md={3}>
            <Card className="profile-card mb-4 p-3 align-items-center">
              <Card.Body className="align-items-center p-0">
                <div className="text-center">
                  <img
                    src="../common/profile.webp"
                    alt="profile"
                    className="user-image m-0"
                  />
                  <Card.Title>{mentor.userName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {mentor.university} : {mentor.enrollmentStatus}
                  </Card.Subtitle>
                  <Badge bg="success m-0">{mentor.gender}</Badge>
                  <br></br>
                  <Badge bg="success m-0">트레이너</Badge>
                </div>
              </Card.Body>
            </Card>
            {id && (
              <ChatButtonMentor mentorId={id} mentorName={mentor.userName} />
            )}
          </Col>
          <Col>
            <MentorDetailCard mentor={mentor} onBack={() => navigate(-1)} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MentorProfileDetailPage;
