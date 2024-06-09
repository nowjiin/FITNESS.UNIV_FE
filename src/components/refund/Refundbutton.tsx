import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import CryptoJS from "crypto-js";

const RefundButton: React.FC = () => {
  const Refund = () => {};

  return (
    <div>
      {/* 결제하기 버튼 */}
      <Button variant="outline-success" onClick={Refund}>
        환불하기
      </Button>
    </div>
  );
};

export default RefundButton;
