import React, { useState } from "react";
import { MenteeData } from "../../../pages/mentee/MenteePage";
import FormRadioGroup from "../../common/FormRadioGroup";
import "./MenteeStep5.scss";
import "../common.scss";

interface Props {
  onComplete: (data: Partial<MenteeData>) => void;
  onPrev: (data: Partial<MenteeData>) => void;
  data: MenteeData;
}

const MenteeStep5: React.FC<Props> = ({ onComplete, onPrev, data }) => {
  const [age, setAge] = useState<string>(data.age || "");

  const handleComplete = () => {
    onComplete({ age });
  };

  const handlePrev = () => {
    onPrev({ age });
  };

  return (
    <div className="mentor-step-page container text-center p-0">
      <div className="mx-auto text-start">
        <div className="input-title">수업하시는 분의 연령대를 알려주세요</div>
        <FormRadioGroup
          options={[
            "사회인",
            "대학생",
            "고등학교 3학년",
            "고등학교 2학년",
            "고등학교 1학년",
            "중학교 3학년",
            "중학교 2학년",
          ]}
          selectedValue={age}
          onChange={setAge}
          groupName="age"
        />
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-light w-50 me-2" onClick={handlePrev}>
            이전
          </button>
          <button
            className={`btn w-50 ms-2
            `}
            onClick={handleComplete}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenteeStep5;
