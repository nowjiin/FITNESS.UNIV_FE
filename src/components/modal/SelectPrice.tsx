import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormRadioGroup from "../common/FormRadioGroup";

interface SelectPriceProps {
  show: boolean;
  handleClose: () => void;
  selectedRate: string | null;
  handleRateSelect: (rate: string) => void;
}

const SelectPrice: React.FC<SelectPriceProps> = ({
  show,
  handleClose,
  selectedRate,
  handleRateSelect,
}) => {
  const [rate, setRate] = useState<string>(selectedRate ?? "");

  const handleCompleteSelection = () => {
    if (rate) {
      handleRateSelect(rate);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>가격대 선택</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>원하시는 가격을 설정해주세요!</p>
        <FormRadioGroup
          options={["40,000원 이상", "30,000원대", "20,000원대", "10,000원대"]}
          selectedValue={rate}
          onChange={setRate}
          groupName="rate"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleCompleteSelection}>
          선택 완료
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectPrice;
