import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function CardGroups() {
  return (
    <Container className="my-5">
      <Row>
        <Col xs={6}>
          <Card>
            <Card.Body>
              <Card.Title className="CardTitle">내 주변 운동시설</Card.Title>
            </Card.Body>
            <Card.Img variant="top" src="./mainpage/near_gyms.png" />
          </Card>
        </Col>
        <Col xs={6}>
          <Card>
            <Card.Body>
              <Card.Title>지도에서 찾기</Card.Title>
            </Card.Body>
            <Card.Img variant="top" src="./mainpage/find_on_map.png" />
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>트레이너 찾기</Card.Title>
            </Card.Body>
            <Card.Img variant="top" src="./mainpage/find_trainer.png" />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CardGroups;
