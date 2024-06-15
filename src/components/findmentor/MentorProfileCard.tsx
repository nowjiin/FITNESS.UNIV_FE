import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { MentorProfile } from "./MentorProfile";
import "./MentorProfileCard.scss";

const MentorProfileCard: React.FC<MentorProfile> = ({
  id,
  userName,
  university,
  major,
  enrollmentStatus,
  gender,
  rate,
  exercises,
  regions,
  certifications,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/findmentor/${id}`);
  };

  return (
    <Card onClick={handleCardClick} className="mentor-profile-card">
      <Card.Body>
        <div className="find-mentor-box">
          <img src="../common/profile.webp" alt="User" className="user-image" />
          <div className="userinformation">
            <div className="user-info">
              <div className="user-name">{userName}</div>
              <div>
                {university} - {major}
              </div>
              <div>{enrollmentStatus}</div>
            </div>
            <div className="user-details">
              <div>
                <Badge bg="primary">성별: {gender}</Badge>
              </div>
              <div>
                <Badge bg="success">1회 가격 {rate}</Badge>
              </div>
              <div>
                <Badge bg="warning">과목: {exercises.join(", ")}</Badge>
              </div>
              <div>
                <Badge bg="danger">지역: {regions.join(", ")}</Badge>
              </div>
              <div>
                <Badge bg="dark">자격증: {certifications}</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MentorProfileCard;
