import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CryptoJS from "crypto-js";

const PaymentSuccessPage: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    console.log("useEffect 실행됨");

    const query = new URLSearchParams(location.search);
    const mercntId = query.get("mercntId");
    const authNo = query.get("authNo");
    const reqDay = query.get("reqDay");
    const reqTime = query.get("reqTime");

    console.log("파라미터:", { mercntId, authNo, reqDay, reqTime });

    if (mercntId && authNo && reqDay && reqTime) {
      const rawSignature = `${mercntId}${authNo}${reqDay}${reqTime}SETTLEBANKISGOODSETTLEBANKISGOOD`;
      const hashedSignature = CryptoJS.SHA256(rawSignature).toString(
        CryptoJS.enc.Hex
      );
      // API 요청에 필요한 파라미터 설정
      const parameters = {
        hdInfo: "IA_APPROV",
        apiVer: "3.0",
        mercntId: mercntId,
        authNo: authNo,
        reqDay: reqDay,
        reqTime: reqTime,
        signature: hashedSignature,
      };

      console.log("Settlebank API 요청 파라미터:", parameters);
      // 프록시를 사용하여 Settlebank API에 POST 요청
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/proxy/settlebank`,
          parameters
        )
        .then((response) => {
          console.log("Settlebank API response:", response.data);
          setPaymentDetails(response.data); // Save the payment details directly from Settlebank API response
          setLoading(false);
        })
        .catch((error) => {
          console.error("Settlebank API error:", error);
          setError("결제 승인 요청에 실패했습니다.");
          setLoading(false);
        });
    } else {
      setError("필수 결제 정보가 누락되었습니다.");
      setLoading(false);
    }
  }, [location.search, isInitialRender]);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  const handleReturn = () => {
    const paymentData = {
      ordNo: paymentDetails.ordNo,
      payPrice: paymentDetails.payPrice,
      trDay: paymentDetails.trDay,
      trTime: paymentDetails.trTime,
    };

    // 부모 창에 결제 데이터를 메시지로 전송
    window.opener.postMessage(
      { type: "navigate_to_mypage", data: paymentData },
      "*"
    );
    // 팝업 창 닫기
    window.close();
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          {error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Card className="mt-5" border="success">
              <Card.Header className="bg-success text-white">
                결제가 완료되었습니다!
              </Card.Header>
              <Card.Body>
                <Card.Title>결제 성공</Card.Title>
                <Card.Text>
                  고객님의 결제가 성공적으로 처리되었습니다. 이용해 주셔서
                  감사합니다.
                </Card.Text>
                {paymentDetails && (
                  <div>
                    <p>
                      <strong>주문 번호:</strong> {paymentDetails.ordNo}
                    </p>
                    <p>
                      <strong>결제 금액:</strong> {paymentDetails.payPrice} 원
                    </p>
                    <p>
                      <strong>결제 날짜:</strong> {paymentDetails.trDay}
                    </p>
                    <p>
                      <strong>결제 시간:</strong> {paymentDetails.trTime}
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
          <Button variant="primary" onClick={handleReturn} className="mt-3">
            마이페이지로 돌아가기
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccessPage;
