import React, { useState } from "react";
import { MentorData } from "../../pages/mentor/MentorPage";
import ExerciseModal from "./ExerciseModal";
import ProgressBar from "../modal/ProgressBar";
import ModalInputDisplay from "../modal/ModalInputDisplay";
import "./MentorStep1.scss";

interface Props {
  onNext: (data: Partial<MentorData>) => void;
  data: MentorData;
}

const MentorStep1: React.FC<Props> = ({ onNext, data }) => {
  const [exercise, setExercise] = useState<string[]>(data.exercise);
  const [showModal, setShowModal] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<
    { category: string; exercise: string }[]
  >(
    data.exercise.map((ex) => ({ category: "unknown", exercise: ex })) // initial state
  );

  const handleNext = () => {
    onNext({ exercise });
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleExerciseSelect = (category: string, exercise: string) => {
    setSelectedExercises((prev) =>
      prev.some((ex) => ex.exercise === exercise && ex.category === category)
        ? prev.filter(
            (ex) => ex.exercise !== exercise || ex.category !== category
          )
        : [...prev, { category, exercise }]
    );
  };

  const handleCompleteSelection = () => {
    setExercise(selectedExercises.map((ex) => ex.exercise));
    setShowModal(false);
  };

  const handleResetSelection = () => {
    setSelectedExercises([]);
  };

  const isAnyExerciseSelected = selectedExercises.length > 0;

  const displayText = selectedExercises
    .map((ex) => `${ex.category} > ${ex.exercise}`)
    .join(", ");

  return (
    <div className="mentor-step1-page container text-center mt-5">
      <div className="mb-4">
        <button className="btn btn-info">Logo</button>
      </div>
      <h2>회원가입</h2>
      <div
        className="card mx-auto mt-4 p-4 text-start"
        style={{ maxWidth: "600px" }}
      >
        <ProgressBar
          currentStep={1}
          totalSteps={10}
          timeEstimate="소요시간 약 3분"
        />
        <div className="input-title">어떤 운동을 알려주실건가요?</div>
        <div className="input-subtitle">가능한 운동들을 모두 선택해주세요.</div>
        <ModalInputDisplay
          displayText={displayText}
          onClick={handleShowModal}
        />
        <div className="d-flex justify-content-between">
          <button className="btn btn-light w-50 me-2">이전</button>
          <button
            className={`btn w-50 ms-2 ${
              isAnyExerciseSelected ? "btn-primary active" : "btn-primary"
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