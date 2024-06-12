import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { MentorProfile } from "./MentorProfile";
import "./MentorProfileCard.scss";

const MentorProfileCard: React.FC<MentorProfile> = (mentor) => {
  return (
    <Card className="mentor-profile-card">
      <Card.Body>
        <div className="find-mentee-box">
          <img src="../common/profile.webp" alt="User" className="user-image" />
          <div className="userinformation">
            <div className="user-info">
              <div className="user-name">{mentor.userName}</div>
              <div>
                {mentor.university} - {mentor.major}
              </div>
              <div>{mentor.enrollmentStatus}</div>
            </div>
            <div className="user-details">
              <div>
                <Badge bg="primary">성별: {mentor.gender}</Badge>
              </div>
              <div>
                <Badge bg="success">1회 가격 {mentor.rate}</Badge>
              </div>
              <div>
                <Badge bg="warning">과목: {mentor.exercises.join(", ")}</Badge>
              </div>
              <div>
                <Badge bg="danger">지역: {mentor.regions.join(", ")}</Badge>
              </div>
              <div>
                <Badge bg="dark">자격증: {mentor.certifications}</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MentorProfileCard;
