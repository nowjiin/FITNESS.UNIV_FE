import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormRadioGroup from "../../components/common/FormRadioGroup";
import "../../components/mentor/common.scss";

interface ProfileData {
  rate: string;
  details: string;
}

interface EditProfileModalProps {
  show: boolean;
  handleClose: () => void;
  profileData: Partial<ProfileData>;
  onSave: (data: Partial<ProfileData>) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  show,
  handleClose,
  profileData,
  onSave,
}) => {
  const [rate, setRate] = useState<string>(profileData.rate || "");
  const [details, setDetails] = useState<string>(profileData.details || "");
  const [charCount, setCharCount] = useState<number>(details.length);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isHintVisible, setIsHintVisible] = useState<boolean>(false);

  const handleSave = () => {
    if (!rate && !details) {
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 1000);
    } else {
      onSave({ rate, details });
      handleClose();
    }
  };

  const toggleHint = () => {
    setIsHintVisible(!isHintVisible);
  };
  useEffect(() => {
    setRate(profileData.rate || "");
    setDetails(profileData.details || "");
    setCharCount((profileData.details || "").length);
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
            <div className="input-title mt-4">자세한 기준</div>
            <textarea
              className="form-control"
              placeholder="가격 선정의 자세한 기준을 작성해주세요!"
              value={details}
              onChange={(e) => {
                setDetails(e.target.value);
                setCharCount(e.target.value.length);
              }}
              rows={10}
            />
            <div className="d-flex justify-content-between mt-2">
              <div className="d-flex justify-content-center align-item-center">
                <div className="item-hints">
                  <div
                    className={`hint ${isHintVisible ? "visible" : ""}`}
                    data-position="4"
                    onClick={toggleHint}
                  >
                    <span className="hint-radius"></span>
                    <span className="hint-dot">Tip</span>
                    <div className="hint-content do--split-children">
                      <p>가격 선정의 기준을 자세히 작성해주시면 좋습니다.</p>
                      <p>예: 강의 준비 시간, 자료 준비 비용 등</p>
                    </div>
                  </div>
                </div>
                작성가이드
              </div>
              <div className="char-count">
                현재 {charCount}자 / 권장 100자 이상
              </div>
            </div>
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

export default EditProfileModal;
