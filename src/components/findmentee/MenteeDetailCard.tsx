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
          <h2>수강생 소개</h2>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>찾는 운동 트레이너 :</strong> {mentee.exercises.join(", ")}
          </Card.Text>
          <Card.Text>
            <strong>1회당 생각중인 금액:</strong> {mentee.rate}
          </Card.Text>
          <Card.Text>
            <strong>가능 지역:</strong> {mentee.regions.join(", ")}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button onClick={onBack}>Back</Button>
        </Card.Footer>
      </Card>
    </>
  );
};

export default MenteeDetailCard;
