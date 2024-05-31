import React, { useEffect, useRef, useState } from "react";
import "./ProgressBar.scss";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  timeEstimate?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  timeEstimate,
}) => {
  const [progress, setProgress] = useState(0);
  const requestRef = useRef<number>();

  useEffect(() => {
    const stepPercentage = 100 / totalSteps;
    const startProgress = stepPercentage * (currentStep - 1);
    const endProgress = stepPercentage * currentStep;
    const duration = 500; // 애니메이션 지속 시간 (밀리초)
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsedTime = time - startTime;
      const newProgress =
        startProgress +
        (endProgress - startProgress) * (elapsedTime / duration);

      if (elapsedTime < duration) {
        setProgress(newProgress);
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(endProgress);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current!);
  }, [currentStep, totalSteps]);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="progress-info">
        <span>
          {currentStep}/{totalSteps}
        </span>
        {timeEstimate && <span>{timeEstimate}</span>}
      </div>
    </div>
  );
};

export default ProgressBar;
