import React, { useState } from "react";
import { MentorData } from "../../../pages/mentor/MentorPage";
import FormRadioGroup from "../../common/FormRadioGroup";
import "./MentorStep4.scss";
import "../common.scss";

interface Props {
  onNext: (data: Partial<MentorData>) => void;
  onPrev: (data: Partial<MentorData>) => void;
  data: MentorData;
}

const MentorStep4: React.FC<Props> = ({ onNext, onPrev, data }) => {
  const [rate, setRate] = useState<string>(data.rate || "");
  const [details, setDetails] = useState<string>(data.details || "");
  const [charCount, setCharCount] = useState<number>(details.length);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isHintVisible, setIsHintVisible] = useState<boolean>(false); // 힌트 가시성 상태

  const handleNext = () => {
    if (!rate && !details) {
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 1000);
    } else {
      onNext({ rate, details });
    }
  };

  const handlePrev = () => {
    onPrev({ rate, details });
  };

  const toggleHint = () => {
    setIsHintVisible(!isHintVisible);
  };

  return (
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
          <div className="char-count">현재 {charCount}자 / 권장 100자 이상</div>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-light w-50 me-2" onClick={handlePrev}>
            이전
          </button>
          <button
            className={`btn w-50 ms-2 ${
              isInvalid
                ? "btn-invalid"
                : rate || details
                ? "btn-primary active"
                : "btn-primary"
            }`}
            onClick={handleNext}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorStep4;
