import React from "react";

interface StepNavigationProps {
  onPrev?: () => void;
  onNext: () => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ onPrev, onNext }) => {
  return (
    <div className="d-flex justify-content-between">
      {onPrev && (
        <button className="btn btn-light w-50 me-2" onClick={onPrev}>
          이전
        </button>
      )}
      <button className="btn btn-primary w-50 ms-2" onClick={onNext}>
        다음
      </button>
    </div>
  );
};

export default StepNavigation;
