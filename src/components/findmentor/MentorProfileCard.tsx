import React from "react";
import Card from "react-bootstrap/Card";
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
              <div>Gender: {mentor.gender}</div>
              <div>Rate: {mentor.rate}</div>
              <div>Exercises: {mentor.exercises.join(", ")}</div>
              <div>Regions: {mentor.regions.join(", ")}</div>
              <div>Certifications: {mentor.certifications}</div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MentorProfileCard;
