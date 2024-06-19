import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormRadioGroup from "../../components/common/FormRadioGroup";
import "../../components/mentor/common.scss";

interface ProfileData {
  rate: string;
  details: string;
}

interface EditMenteeProfileModalProps {
  show: boolean;
  handleClose: () => void;
  profileData: Partial<ProfileData>;
  onSave: (data: Partial<ProfileData>) => void;
}

const EditMenteeProfileModal: React.FC<EditMenteeProfileModalProps> = ({
  show,
  handleClose,
  profileData,
  onSave,
}) => {
  const [rate, setRate] = useState<string>(profileData.rate || "");
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const handleSave = () => {
    if (!rate) {
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 1000);
    } else {
      onSave({ rate });
      handleClose();
    }
  };

  useEffect(() => {
    setRate(profileData.rate || "");
  }, [profileData]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>프로필 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mentor-step-page container text-center p-0">
          <div className="mx-auto text-start">
            <div className="input-title">
              1회(1시간) 기준의 최소 수업료를 알려주세요
            </div>
            <FormRadioGroup
              options={[
                "40,000원",
                "30,000원",
                "20,000원",
                "10,000원",
                "추후 협의",
              ]}
              selectedValue={rate}
              onChange={setRate}
              groupName="rate"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button
          className={`btn ${isInvalid ? "btn-invalid" : "btn-primary"}`}
          onClick={handleSave}
        >
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditMenteeProfileModal;
