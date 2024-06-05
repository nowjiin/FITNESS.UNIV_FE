import React, { useState } from "react";
import { MenteeData } from "../../../pages/mentee/MenteePage";
import FormRadioGroup from "../../common/FormRadioGroup";
import "./MenteeStep4.scss";
import "../common.scss";

interface Props {
  onNext: (data: Partial<MenteeData>) => void;
  onPrev: (data: Partial<MenteeData>) => void;
  data: MenteeData;
}

const MenteeStep4: React.FC<Props> = ({ onNext, onPrev, data }) => {
  const [rate, setRate] = useState<string>(data.rate || "");
  const [details, setDetails] = useState<string>(data.details || "");
  const [charCount, setCharCount] = useState<number>(details.length);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  const handleNext = () => {
    onNext({ rate, details });
  };

  const handlePrev = () => {
    onPrev({ rate, details });
  };

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
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
          <div className="guide-text">
            <img
              src="./buttons/icon-help-circle.png"
              alt="도움말"
              className="help-icon"
              onClick={toggleTooltip}
            />
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
              rate && details.length >= 100
                ? "btn-primary active"
                : "btn-primary"
            }`}
            onClick={handleNext}
            // disabled={!rate || details.length < 100}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenteeStep4;
