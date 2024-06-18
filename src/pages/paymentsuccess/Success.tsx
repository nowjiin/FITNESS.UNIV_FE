import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import CryptoJS from "crypto-js";

const PaymentSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    navigate("/Mypage");
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          {error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Alert variant="success" className="mt-5">
              <h4>결제가 완료되었습니다!</h4>
              <p>
                고객님의 결제가 성공적으로 처리되었습니다. 이용해 주셔서
                감사합니다.
              </p>
              {paymentDetails && (
                <div>
                  <p>주문 번호: {paymentDetails.ordNo}</p>
                  <p>결제 금액: {paymentDetails.payPrice} 원</p>
                  <p>결제 날짜: {paymentDetails.trDay}</p>
                  <p>결제 시간: {paymentDetails.trTime}</p>
                  <p>상태 메시지: {paymentDetails.resultMsg}</p>
                </div>
              )}
            </Alert>
          )}
          <Button variant="primary" onClick={handleReturn}>
            마이페이지로 돌아가기
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccessPage;
