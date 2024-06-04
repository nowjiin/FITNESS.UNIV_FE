import React, { useCallback } from "react";
import Button from 'react-bootstrap/Button';

const Paybutton: React.FC = () => {

  const handlePayment = useCallback(() => {
    const params: { [key: string]: any } = {
      mchtId: "nxca_jt_il",
      method: "card",
      trdDt: "20211231",
      trdTm: "100000",
      mchtTrdNo: "ORDER20211231100000",
      mchtName: "피트니스유니버시티",
      mchtEName: "FITNESSUNIV",
      pmtPrdtNm: "PT10회권",
      trdAmt: "AntV/eDpxIaKF0hJiePDKA==", // 암호화된 거래금액
      mchtCustNm: "홍길동",
      notiUrl: "https://example.com/notiUrl",
      nextUrl: "https://example.com/nextUrl",
      cancUrl: "https://example.com/cancUrl",
      pktHash: "f395b6725a9a18f2563ce34f8bc76698051d27c05e5ba815f463f00429061c0c",
      ui: {
        type: "popup",
        width: "430",
        height: "660"
      }
    };

    const formBody = Object.keys(params)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      .join('&');

    fetch("https://tbnpg.settlebank.co.kr/card/main.do", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: formBody
    })
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then(text => { throw new Error(text) });
      }
    })
    .then(html => {
      // HTML 응답을 받아서 페이지를 이동
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.open();
        newWindow.document.write(html);
        newWindow.document.close();
      } else {
        throw new Error("Unable to open new window");
      }
    })
    .catch(error => {
      console.error("Error:", error.message);
    });
   
  }, []);

  return (
    <>
      <Button variant="outline-success" onClick={handlePayment}>결제하기</Button>{' '}
    </>
  );
}

export default Paybutton;
