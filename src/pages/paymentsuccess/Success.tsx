import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useLocation } from "react-router-dom";

const PaymentSuccessPage: React.FC = () => {
  const location = useLocation(); // 현재 URL의 쿼리 파라미터를 가져오기 위해 useLocation 훅 사용
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태 관리
  const [isInitialRender, setIsInitialRender] = useState(true); // 초기 렌더링 여부를 추적하는 상태

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false); // 첫 번째 실행 후 초기 렌더링 상태를 false로 설정
      return; // 초기 렌더링 동안에는 useEffect의 로직을 실행하지 않음
    }

    console.log("useEffect 실행됨"); // useEffect 실행 확인

    const query = new URLSearchParams(location.search); // 쿼리 파라미터 파싱
    const mercntId = query.get("mercntId");
    const authNo = query.get("authNo");
    const reqDay = query.get("reqDay");
    const reqTime = query.get("reqTime");

    console.log("파라미터:", { mercntId, authNo, reqDay, reqTime });

    if (mercntId && authNo && reqDay && reqTime) {
      // Settlebank API 호출을 위한 서명 생성
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
        //로그에 핵토에서 보낸 파라미터값 출력
        .then((response) => {
          console.log("Settlebank API response:", response.data);
          // 결제 회사의 응답 데이터를 백엔드로 전송
          axios
            .post(
              `${process.env.REACT_APP_BACKEND_URL}/payment/approval`,
              response.data
            )
            .then((backendResponse) => {
              console.log("Backend response:", backendResponse.data);
              setLoading(false); // 로딩 상태 해제
            })
            .catch((backendError) => {
              console.error("Backend error:", backendError);
              setError(
                "백엔드로 결제 승인 데이터를 전송하는 중에 오류가 발생했습니다."
              ); // 에러 메시지 설정
              setLoading(false); // 로딩 상태 해제
            });
        })
        .catch((error) => {
          console.error("Settlebank API error:", error);
          setError("결제 승인 요청에 실패했습니다."); // 에러 메시지 설정
          setLoading(false); // 로딩 상태 해제
        });
    } else {
      setError("필수 결제 정보가 누락되었습니다."); // 필요한 파라미터가 없을 경우 에러 메시지 설정
      setLoading(false); // 로딩 상태 해제
    }
  }, [location.search, isInitialRender]); // location.search 값이 변경될 때마다 useEffect 실행

  if (loading) {
    return <Container>Loading...</Container>; // 로딩 중일 때 표시할 컴포넌트
  }

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
          {error && <Alert variant="danger">{error}</Alert>}{" "}
          {/* 에러가 있을 경우 에러 메시지 표시 */}
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccessPage;
