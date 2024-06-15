import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResetButton from "../../common/ResetButton";
import SearchInput from "../../common/SearchInput";
import "./ExerciseModal.scss";

interface ExerciseModalProps {
  show: boolean;
  handleClose: () => void;
  selectedExercises: string[];
  handleExerciseSelect: (exercise: string) => void;
  handleCompleteSelection: () => void;
  handleResetSelection: () => void;
}

const categories = ["헬스", "골프", "필라테스", "요가", "테니스", "클라이밍"];
const exercisesByCategory: { [key: string]: string[] } = {
  헬스: [
    "PT/다이어트",
    "PT/근력 강화",
    "PT/체중 증가",
    "PT/체력 증진",
    "PT/체형 교정",
    "PT/바디프로필",
  ],
  골프: ["스크린골프", "필드 골프", "입문/기초 레슨"],
  필라테스: ["필라테스/체형교정", "기구 필라테스", "메트 필라테스"],
  요가: ["플라잉 요가", "일반요가", "핫 요가"],
  테니스: ["실외 테니스", "실내 테니스"],
  클라이밍: ["클라이밍/취미", "클라이밍/실력향상", "클라이밍/일일체험"],
  "Nav Item": ["피트니스"],
};

const ExerciseModal: React.FC<ExerciseModalProps> = ({
  show,
  handleClose,
  selectedExercises,
  handleExerciseSelect,
  handleCompleteSelection,
  handleResetSelection,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredExercises = exercisesByCategory[selectedCategory].filter(
    (exercise) => exercise.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSelected = (exercise: string) => {
    return selectedExercises.includes(exercise);
  };

  return (
    <Modal show={show} onHide={handleClose} className="exercise-modal">
      <Modal.Header className="modal-header">
        <Modal.Title>운동 선택</Modal.Title>
        <button
          type="button"
          className="custom-close-button"
          onClick={handleClose}
        >
          <img src="./buttons/icon-x-circle.png" alt="x" />
        </button>
        <SearchInput placeholder="운동명으로 검색" onSearch={handleSearch} />
      </Modal.Header>
      <Modal.Body className="d-flex">
        <div className="sidebar">
          {categories.map((category) => (
            <div
              key={category}
              className={`sidebar-item ${
                category === selectedCategory ? "selected" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <div className="content">
          <div className="exercise-list">
            {filteredExercises.map((exercise: string) => (
              <div
                key={exercise}
                className={`exercise-item ${
                  isSelected(exercise) ? "selected" : ""
                }`}
                onClick={() => handleExerciseSelect(exercise)}
              >
                {exercise}
                {isSelected(exercise) && <span className="check-mark">✔</span>}
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer">
        <ResetButton onClick={handleResetSelection} />
        <Button
          variant="primary"
          onClick={handleCompleteSelection}
          className={`custom-complete-button ${
            selectedExercises.length > 0 ? "active" : ""
          }`}
        >
          선택 완료
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExerciseModal;
