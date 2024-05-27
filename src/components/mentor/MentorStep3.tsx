import React from 'react';
import { MentorData } from '../../pages/mentor/MentorPage';

interface Props {
  onPrev: (data: Partial<MentorData>) => void;
  data: MentorData;
}

const MentorStep3: React.FC<Props> = ({ onPrev, data }) => {
  const handlePrev = () => {
    onPrev({});
  };

  return (
    <div>
      <h2>최종 확인</h2>
      <p>선택한 운동: {data.exercise.join(', ')}</p>
      <button onClick={handlePrev}>이전</button>
      <button>제출</button>
    </div>
  );
};

export default MentorStep3;
