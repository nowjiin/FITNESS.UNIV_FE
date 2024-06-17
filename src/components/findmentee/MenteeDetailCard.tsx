import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { MenteeProfile } from "./MenteeProfile";

interface MenteeDetailCardProps {
  mentee: MenteeProfile;
  onBack: () => void;
}

const MenteeDetailCard: React.FC<MenteeDetailCardProps> = ({
  mentee,
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
            <strong>수강생 소개:</strong> 여기 머넣지
          </Card.Text>
          <Card.Text>
            <strong>1회당 금액:</strong> {mentee.rate}
          </Card.Text>
          <Card.Text>여기머넣지 </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button onClick={onBack}>Back</Button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default MenteeDetailCard;
