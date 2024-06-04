import React, { useState } from "react";
import { MenteeData } from "../../../pages/mentee/MenteePage";
import FormRadioGroup from "../../common/FormRadioGroup";

import "../common.scss";

interface Props {
  onNext: (data: Partial<MenteeData>) => void;
  onPrev: (data: Partial<MenteeData>) => void;
  data: MenteeData;
}

const MenteeStep3: React.FC<Props> = ({ onNext, onPrev, data }) => {
  const [gender, setGender] = useState<string>(data.gender || "");

  const handleNext = () => {
    onNext({ gender });
  };

  const handlePrev = () => {
    onPrev({ gender });
  };

  return (
    <div className="mentor-step-page container text-center p-0">
      <div className=" mx-auto text-start">
        <div className="input-title">트레이너 님의 성별을 알려주세요</div>
        <FormRadioGroup
          options={["남자", "여자"]}
          selectedValue={gender}
          onChange={setGender}
          groupName="gender"
        />
        <div className="d-flex justify-content-between">
          <button className="btn btn-light w-50 me-2" onClick={handlePrev}>
            이전
          </button>
          <button
            className={`btn w-50 ms-2 ${
              gender ? "btn-primary active" : "btn-primary"
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

export default MenteeStep3;
