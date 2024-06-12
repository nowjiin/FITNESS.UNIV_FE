import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { MenteeProfile } from "./MenteeProfile";
import "./MenteeProfileCard.scss";

const MenteeProfileCard: React.FC<MenteeProfile> = (mentee) => {
  return (
    <Card className="mentee-profile-card">
      <Card.Body>
        <div className="find-mentee-box">
          <img src="../common/profile.webp" alt="User" className="user-image" />
          <div className="userinformation">
            <div className="user-info">
              <div className="user-name">{mentee.userName}</div>
            </div>
            <div className="user-details">
              <div>
                <Badge bg="primary">성별: {mentee.gender}</Badge>
              </div>
              <div>
                <Badge bg="success">1회 가격 {mentee.rate}</Badge>
              </div>
              <div>
                <Badge bg="warning">과목: {mentee.exercises.join(", ")}</Badge>
              </div>
              <div>
                <Badge bg="danger">지역: {mentee.regions.join(", ")}</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MenteeProfileCard;
