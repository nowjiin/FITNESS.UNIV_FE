import React from "react";
import { MentorData } from "../../../pages/mentor/MentorPage";
import "./MentorStep5.scss";
import "../common.scss";

interface Props {
  onPrev: (data: Partial<MentorData>) => void;
  onComplete: () => void;
  data: MentorData;
}

const MentorStep5: React.FC<Props> = ({ onPrev, onComplete, data }) => {
  const handlePrev = () => {
    onPrev({});
  };

  return (
    <div className="mentor-step-page container text-center p-0">
      <div className="mx-auto text-start">
        <div className="input-title">입력한 내용을 확인해주세요</div>
        <div className="review-section">
          <div className="review-item">
            <div className="review-label">운동 종류:</div>
            <div className="review-value">{data.exercise.join(", ")}</div>
          </div>
          <div className="review-item">
            <div className="review-label">가능한 지역:</div>
            <div className="review-value">{data.regions.join(", ")}</div>
          </div>
          <div className="review-item">
            <div className="review-label">성별:</div>
            <div className="review-value">{data.gender}</div>
          </div>
          <div className="review-item">
            <div className="review-label">최소 수업료:</div>
            <div className="review-value">{data.rate}</div>
          </div>
          <div className="review-item">
            <div className="review-label">자세한 기준:</div>
            <div className="review-value">{data.details}</div>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-light w-50 me-2" onClick={handlePrev}>
            이전
          </button>
          <button className="btn btn-primary w-50 ms-2" onClick={onComplete}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorStep5;
