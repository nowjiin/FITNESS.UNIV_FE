import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { MentorProfile } from "./MentorProfile";
import PayButton from "../payment/PayButton"; // Import PaymentComponent

interface MentorDetailCardProps {
  mentor: MentorProfile;
  onBack: () => void;
}

const MentorDetailCard: React.FC<MentorDetailCardProps> = ({
  mentor,
  onBack,
}) => {
  return (
    <>
      <Card>
        <Card.Header>
          <h2>트레이너 소개</h2>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>트레이너 소개:</strong> {mentor.details}
          </Card.Text>
          <Card.Text>
            <strong>1회당 금액:</strong> {mentor.rate}
          </Card.Text>
          <Card.Text>
            <strong>Description:</strong> {mentor.certifications}
          </Card.Text>
          <PayButton rate={mentor.rate} /> {/* Pass mentor.rate as prop */}
        </Card.Body>
        <Card.Footer>
          <Button onClick={onBack}>Back</Button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default MentorDetailCard;
