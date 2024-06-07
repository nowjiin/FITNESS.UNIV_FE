import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

const PaymentSuccessPage: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Alert variant="success" className="mt-5">
            <h4>결제가 완료되었습니다!</h4>
            <p>
              고객님의 결제가 성공적으로 처리되었습니다. 이용해 주셔서
              감사합니다.
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccessPage;
