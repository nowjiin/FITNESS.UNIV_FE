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

  const handleNext = () => {
    onNext({ rate });
  };

  const handlePrev = () => {
    onPrev({ rate });
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
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-light w-50 me-2" onClick={handlePrev}>
            이전
          </button>
          <button className={`btn btn-light w-50 ms-2`} onClick={handleNext}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenteeStep4;
