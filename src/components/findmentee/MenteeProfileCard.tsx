import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { MenteeProfile } from "./MenteeProfile";
import "./MenteeProfileCard.scss";

const MenteeProfileCard: React.FC<MenteeProfile> = ({
  id,
  userName,
  exercises,
  regions,
  gender,
  rate,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/findmentee/${id}`);
  };

  return (
    <Card onClick={handleCardClick} className="mentee-profile-card">
      <Card.Body>
        <div className="find-mentee-box">
          <img src="../common/profile.webp" alt="User" className="user-image" />
          <div className="userinformation">
            <div className="user-info">
              <div className="user-name">{userName}</div>
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
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MenteeProfileCard;
