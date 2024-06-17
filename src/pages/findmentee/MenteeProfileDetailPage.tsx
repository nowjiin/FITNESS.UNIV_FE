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
import { MenteeProfile } from "../../components/findmentee/MenteeProfile";
import LoginedNavBar from "../../components/navbar/LoginedNavBar";
import NavMenuBar from "../../components/navbar/NavMenuBar";
import MenteeDetailCard from "../../components/findmentee/MenteeDetailCard";
import ChatButtonMentor from "../../components/common/ChatButtonMentor"; // 경로를 조정하세요

const MenteeProfileDetailPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [mentee, setMentee] = useState<MenteeProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenteeDetail = async () => {
      if (!id) {
        // id가 없는 경우 처리
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
          `${process.env.REACT_APP_BACKEND_URL}/api/mentee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMentee(response.data);
      } catch (error) {
        await handleTokenError(error, fetchMenteeDetail);
      }
    };

    fetchMenteeDetail();
  }, [id, navigate]);

  if (!mentee) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <LoginedNavBar />
      <NavMenuBar />
      <Container className="mentor-profile-detail-page mt-4">
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
                  <Card.Title>{mentee.userName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    대학{" "}
                  </Card.Subtitle>
                  <Badge bg="success m-0">{mentee.gender}</Badge>
                  <br></br>
                  <Badge bg="success m-0">수강생</Badge>
                </div>
              </Card.Body>
            </Card>
            {id && (
              <ChatButtonMentor mentorId={id} mentorName={mentee.userName} />
            )}
          </Col>
          <Col>
            <MenteeDetailCard mentee={mentee} onBack={() => navigate(-1)} />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default MenteeProfileDetailPage;
