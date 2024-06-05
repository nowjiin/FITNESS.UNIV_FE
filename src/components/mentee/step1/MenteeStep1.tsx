import React, { useState, useEffect } from "react";
import { MenteeData } from "../../../pages/mentee/MenteePage";
import ExerciseModal from "./ExerciseModal";
import ModalInputDisplay from "../../modal/ModalInputDisplay";
import "../common.scss";

interface Props {
  onNext: (data: Partial<MenteeData>) => void;
  data: MenteeData;
}

const MentorStep1: React.FC<Props> = ({ onNext, data }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    // 기존에 선택된 운동을 설정
    setSelectedExercises(data.exercise || []);
  }, [data.exercise]);

  const handleNext = () => {
    if (selectedExercises.length === 0) {
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 1000); // 1초 후에 다시 원상태로
    } else {
      onNext({ exercise: selectedExercises });
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleExerciseSelect = (exercise: string) => {
    setSelectedExercises((prev) =>
      prev.includes(exercise)
        ? prev.filter((ex) => ex !== exercise)
        : [...prev, exercise]
    );
  };

  const handleCompleteSelection = () => {
    setShowModal(false);
  };

  const handleResetSelection = () => {
    setSelectedExercises([]);
  };

  const isAnyExerciseSelected = selectedExercises.length > 0;

  return (
    <div className="mentor-step-page container text-center p-0">
      <div className="mx-auto text-start">
        <div className="input-title">어떤 운동을 배우고 싶으신가요?</div>
        <div className="input-subtitle">
          배우고 싶은 운동들을 모두 선택해주세요.
        </div>
        <ModalInputDisplay
          displayText={selectedExercises.join(", ")}
          onClick={handleShowModal}
          placeholder="운동 선택"
        />
        <div className="d-flex justify-content-between">
          <button className="btn btn-light w-50 me-2">이전</button>
          <button
            className={`btn w-50 ms-2 ${
              isInvalid
                ? "btn-invalid"
                : isAnyExerciseSelected
                ? "btn-primary active"
                : "btn-primary"
            }`}
            onClick={handleNext}
          >
            다음
          </button>
        </div>
      </div>
      <ExerciseModal
        show={showModal}
        handleClose={handleCloseModal}
        selectedExercises={selectedExercises}
        handleExerciseSelect={handleExerciseSelect}
        handleCompleteSelection={handleCompleteSelection}
        handleResetSelection={handleResetSelection}
      />
    </div>
  );
};

export default MentorStep1;
