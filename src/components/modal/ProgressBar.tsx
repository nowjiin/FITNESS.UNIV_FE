import React from "react";
import "./ProgressBar.scss";

interface ProgressProps {
  currentStep: number;
  totalSteps: number;
  timeEstimate: string;
}

const Progress: React.FC<ProgressProps> = ({
  currentStep,
  totalSteps,
  timeEstimate,
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  return (
    <div>
      <div className="progress-status">
        <div className="spantime">{timeEstimate}</div>
        <div className="remain-step">
          {currentStep}/{totalSteps}
        </div>
      </div>
      <div className="progress mb-3" style={{ height: "10px" }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progressPercentage}%` }}
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
