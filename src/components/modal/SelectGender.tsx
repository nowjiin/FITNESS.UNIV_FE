import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormRadioGroup from "../common/FormRadioGroup";

interface SelectGenderProps {
  show: boolean;
  handleClose: () => void;
  selectedGender: string | null;
  handleGenderSelect: (gender: string) => void;
}

const SelectGender: React.FC<SelectGenderProps> = ({
  show,
  handleClose,
  selectedGender,
  handleGenderSelect,
}) => {
  const [gender, setGender] = useState<string | null>(selectedGender);

  const handleSelectGender = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const handleCompleteSelection = () => {
    if (gender) {
      handleGenderSelect(gender);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>성별 선택</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>원하시는 성별을 선택해주세요!</p>
        <FormRadioGroup
          options={["남자", "여자"]}
          selectedValue={gender || ""}
          onChange={setGender}
          groupName="gender"
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

export default SelectGender;
