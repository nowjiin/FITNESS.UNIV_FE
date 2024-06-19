import React from "react";
import Card from "react-bootstrap/Card";
import { MentorProfile } from "./MentorProfile";
import PayButton from "../payment/PayButton"; // Import PaymentComponent
import "../common/common-btn.scss";
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
          <div
            dangerouslySetInnerHTML={{
              __html: (mentor.details || "").replace(/\n/g, "<br />"),
            }}
          />
          <Card.Text>
            <strong>자격증:</strong> {mentor.certifications}
          </Card.Text>
          <Card.Text>
            <strong>1회당 금액:</strong> {mentor.rate}
          </Card.Text>
          <PayButton rate={mentor.rate} /> {/* Pass mentor.rate as prop */}
        </Card.Body>
        <Card.Footer>
          <button className="btn btn-primary" type="button" onClick={onBack}>
            뒤로가기
          </button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default MentorDetailCard;
