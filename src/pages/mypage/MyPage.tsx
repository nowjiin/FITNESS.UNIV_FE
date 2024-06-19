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
import EditProfileModal from "./EditProfileModal";
import EditMenteeProfileModal from "./EditMenteeProfileModal";
import { handleTokenError } from "../../auth/tokenService";
import "./MyPage.scss";
import ChatButton from "../../components/common/ChatButton";

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

interface PaymentApprovalData {
  payPrice: string;
  mentorUserName: string;
  trDay: string;
  trNo: string;
}

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mentorId } = location.state || {};
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

  const [isMentor, setIsMentor] = useState(false);
  const [paymentApprovals, setPaymentApprovals] = useState<
    PaymentApprovalData[]
  >([]);
  const [mentorPaymentApprovals, setMentorPaymentApprovals] = useState<
    PaymentApprovalData[]
  >([]);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditModalClose = () => setShowEditModal(false);
  const handleEditModalShow = () => setShowEditModal(true);

  const handleSaveProfileData = async (updatedData: Partial<ProfileData>) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인한 사용자만 이용 가능합니다!");
        navigate("/");
        return;
      }

      const endpoint =
        profileData.role === "ROLE_MENTOR"
          ? `${process.env.REACT_APP_BACKEND_URL}/api/mentor-profile`
          : `${process.env.REACT_APP_BACKEND_URL}/api/mentee-profile`;

      // API 요청으로 업데이트된 데이터를 서버에 전송
      await axios.put(endpoint, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 업데이트된 데이터를 상태에 반영
      setProfileData((prevData) => ({
        ...prevData,
        ...updatedData,
      }));
      alert("프로필이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      await handleTokenError(error, () => handleSaveProfileData(updatedData));
      console.error("Error updating profile data:", error);
    }
  };

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
      setIsMentor(role === "ROLE_MENTOR");
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
          role: role,
          details: profileData.details,
          certifications: profileData.certifications,
          enrollment_status: profileData.enrollment_status,
          exercises: profileData.exercises,
          major: profileData.major,
          rate: profileData.rate,
        });

        const paymentRequests = [
          axios.get<PaymentApprovalData[]>(
            `${process.env.REACT_APP_BACKEND_URL}/payment/approval`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ];

        if (mentorId) {
          paymentRequests.push(
            axios.get<PaymentApprovalData[]>(
              `${process.env.REACT_APP_BACKEND_URL}/payment/approval/mentor`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                params: {
                  mentorId: mentorId,
                },
              }
            )
          );
        }

        const [menteePayments, mentorPayments] = await Promise.all(
          paymentRequests
        );

        setPaymentApprovals(menteePayments.data);
        if (mentorPayments) {
          setMentorPaymentApprovals(mentorPayments.data);
        }
      }
    } catch (error) {
      await handleTokenError(error, fetchProfileData);
    }
  }, [navigate, mentorId]);

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
            <ChatButton />
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
              <Card.Header>등록정보</Card.Header>
              <Card.Body>
                <div>
                  1회 가격 : {profileData.rate} <br />
                  {isMentor && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: (profileData.details || "").replace(
                          /\n/g,
                          "<br />"
                        ),
                      }}
                    />
                  )}
                </div>
                <Button variant="outline-primary" onClick={handleEditModalShow}>
                  수정하기
                </Button>
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

            {paymentApprovals.length > 0 && (
              <Card className="mb-4">
                <Card.Header>결제 내역</Card.Header>
                <Card.Body>
                  <ListGroup>
                    {paymentApprovals.map((approval, index) => (
                      <ListGroup.Item key={index}>
                        <strong>결제 금액:</strong> {approval.payPrice} 원
                        <br />
                        <strong>멘토 이름:</strong> {approval.mentorUserName}
                        <br />
                        <strong>결제 날짜:</strong> {approval.trDay}
                        <br />
                        <strong>거래 번호:</strong> {approval.trNo}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}

            {mentorPaymentApprovals.length > 0 && (
              <Card className="mb-4">
                <Card.Header>멘토 결제 내역</Card.Header>
                <Card.Body>
                  <ListGroup>
                    {mentorPaymentApprovals.map((approval, index) => (
                      <ListGroup.Item key={index}>
                        <strong>결제 금액:</strong> {approval.payPrice} 원
                        <br />
                        <strong>수강생 이름:</strong> {approval.mentorUserName}
                        <br />
                        <strong>결제 날짜:</strong> {approval.trDay}
                        <br />
                        <strong>거래 번호:</strong> {approval.trNo}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
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
            {isMentor && (
              <Card className="mb-4">
                <Card.Header>증명서류 관리</Card.Header>
                <Card.Body>{profileData.certifications}</Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>

      {isMentor ? (
        <EditProfileModal
          show={showEditModal}
          handleClose={handleEditModalClose}
          profileData={profileData}
          onSave={handleSaveProfileData}
        />
      ) : (
        <EditMenteeProfileModal
          show={showEditModal}
          handleClose={handleEditModalClose}
          profileData={profileData}
          onSave={handleSaveProfileData}
        />
      )}
    </>
  );
};

export default MyPage;
