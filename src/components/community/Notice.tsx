import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
// import "./Notice.scss";

const notices = [
  {
    title: "",
    content: "최종 배포 날짜 : 06월16일",
  },
  {
    title: "",
    content: "방명록이라도 써주세요.",
  },
  {
    title: "",
    content: "ㅠㅠ",
  },
];

const Notice: React.FC = () => {
  return (
    <Container className="">
      <Row>
        {notices.map((notice, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Body>
                <Badge>공지</Badge>
                <Card.Title>{notice.title}</Card.Title>
                <Card.Text>{notice.content}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Notice;
