import React, { useState } from 'react';
import { MentorData } from '../../pages/mentor/MentorPage';
import arrowicon from '../../assets/buttons/icon-arrow-right-circle.png';
interface Props {
  onNext: (data: Partial<MentorData>) => void;
  data: MentorData;
}

const MentorStep1: React.FC<Props> = ({ onNext, data }) => {
  const [exercise, setExercise] = useState<string[]>(data.exercise);

  const handleExerciseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setExercise(prev => 
      prev.includes(value) ? prev.filter(ex => ex !== value) : [...prev, value]
    );
  };

  const handleNext = () => {
    onNext({ exercise });
  };

  return (
    <div className="mentor-step1-page container text-center mt-5">
      <div className="mb-4">
        <button className="btn btn-info">Logo</button>
      </div>
      <h2>회원가입</h2>
      <div className="card mx-auto mt-4 p-4" style={{ maxWidth: '600px' }}>
        <div className="progress mb-3" style={{ height: '10px' }}>
          <div className="progress-bar" role="progressbar" style={{ width: '10%' }} aria-valuenow={10} aria-valuemin={0} aria-valuemax={100}></div>
        </div>
        <h3>어떤 운동을 알려주실건가요?</h3>
        <p>가능한 운동들을 모두 선택해주세요.</p>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="운동 선택"
            value={exercise.join(', ')}
            onChange={handleExerciseChange}
          />
          <button className="btn btn-outline-secondary" type="button">
            <img src={arrowicon} alt="arrow icon" />
          </button>
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-light">이전</button>
          <button className="btn btn-primary" onClick={handleNext}>다음</button>
        </div>
      </div>
    </div>
  );
};

export default MentorStep1;