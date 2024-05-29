import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResetButton from "../common/ResetButton";
import SearchInput from "../common/SearchInput";
import "./ExerciseModal.scss";

interface ExerciseModalProps {
  show: boolean;
  handleClose: () => void;
  selectedExercises: { category: string; exercise: string }[];
  handleExerciseSelect: (category: string, exercise: string) => void;
  handleCompleteSelection: () => void;
  handleResetSelection: () => void;
}

const categories = ["헬스", "취미", "필라테스", "요가", "스쿼시", "클라이밍"];
const exercisesByCategory: { [key: string]: string[] } = {
  헬스: ["피트니스", "test", "test2", "test3", "test4", "test5"],
  취미: ["취미1", "취미2", "취미3", "취미4", "취미5"],
  필라테스: ["필라테스1", "필라테스2", "필라테스3", "필라테스4"],
  요가: ["요가 1", "요가2", "요가3", "요가4", "요가5"],
  스쿼시: ["스쿼시1", "스쿼시2", "123", " 스퉈시 3"],
  클라이밍: ["클라이밍"],
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
    return selectedExercises.some(
      (selected) =>
        selected.exercise === exercise && selected.category === selectedCategory
    );
  };

  return (
    <div className="container">
      <Modal show={show} onHide={handleClose}>
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
                  onClick={() =>
                    handleExerciseSelect(selectedCategory, exercise)
                  }
                >
                  {exercise}
                  {isSelected(exercise) && (
                    <span className="check-mark">✔</span>
                  )}
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
    </div>
  );
};

export default ExerciseModal;
