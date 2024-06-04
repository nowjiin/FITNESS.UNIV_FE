import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import CryptoJS from 'crypto-js';

// 글로벌 윈도우 객체에 SettlePay를 선언
declare global {
  interface Window {
    SettlePay: any;
  }
}

const PaymentComponent: React.FC = () => {
  useEffect(() => {
    // 컴포넌트가 마운트될 때 SettlePay.js 스크립트를 동적으로 로드
    const script = document.createElement('script');
    script.src = 'https://tbezauth.settlebank.co.kr/js/SettlePay.js';
    script.charset = 'UTF-8';
    script.onload = () => {
      console.log('SettlePay.js loaded.');
    };
    document.head.appendChild(script);
  }, []);

  // 결제 버튼 클릭 시 호출되는 함수
  const handlePayment = () => {
    // 현재 날짜와 시간을 얻기 위한 Date 객체 생성
    const now = new Date();
    const trDay = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD 형식
    const trTime = now.toTimeString().slice(0, 8).replace(/:/g, ''); // HHMMSS 형식

    console.log(trDay);
    console.log(trTime);

    // 결제에 필요한 파라미터 정의
    const rawSignature = `M2266045OID201902210001${trDay}${trTime}1SETTLEBANKISGOODSETTLEBANKISGOOD`;
    const hashedSignature = CryptoJS.SHA256(rawSignature).toString(CryptoJS.enc.Hex);

    const parameters: Record<string, string> = {
      hdInfo: 'IA_AUTHPAGE_1.0_1.0',
      apiVer: '1.0', // 또는 '2.0'
      processType: 'D',
      mercntId: 'M2266045',
      ordNo: 'OID201902210001',
      trDay: trDay,
      trTime: trTime,
      trPrice: '1', // 필요에 따라 암호화된 값
      productNm: '배추',
      dutyFreeYn: 'N',
      callbackUrl: 'https://callback.co.kr',
      signature: hashedSignature,
    };

    // 폼 객체 생성
    const form = document.createElement('form');
    form.name = 'sampleFm';

    // 파라미터를 폼에 hidden input 요소로 추가
    Object.keys(parameters).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = parameters[key];
      form.appendChild(input);
    });

    // 폼을 문서 바디에 추가
    document.body.appendChild(form);

    // SettlePay 객체가 로드되었는지 확인 후 execute 메소드 호출
    if (window.SettlePay) {
      window.SettlePay.execute(form);
    } else {
      console.error('SettlePay is not defined');
    }
  };

  return (
    <div>
      {/* 결제하기 버튼 */}
      <Button variant="outline-success" onClick={handlePayment}>
        결제하기
      </Button>
    </div>
  );
};

export default PaymentComponent;
