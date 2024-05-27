import React, { useState } from 'react';
import { MentorData } from '../../pages/mentor/MentorPage';


interface Props {
  onNext: (data: Partial<MentorData>) => void;
  onPrev: (data: Partial<MentorData>) => void;
  data: MentorData;
}

const MentorStep2: React.FC<Props> = ({ onNext, onPrev, data }) => {
  const [exerciseDetails, setExerciseDetails] = useState<string[]>(data.exercise);

  const handleExerciseDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setExerciseDetails(prev => 
      prev.includes(value) ? prev.filter(ex => ex !== value) : [...prev, value]
    );
  };

  const handleNext = () => {
    onNext({ exercise: exerciseDetails });
  };

  const handlePrev = () => {
    onPrev({ exercise: exerciseDetails });
  };

  return (
    <div>
      <h2>운동 세부 정보 입력</h2>
      <input
        type="text"
        value={exerciseDetails.join(', ')}
        onChange={handleExerciseDetailsChange}
        placeholder="운동 세부 정보"
      />
      <button onClick={handlePrev}>이전</button>
      <button onClick={handleNext}>다음</button>
    </div>
  );
};

export default MentorStep2;
