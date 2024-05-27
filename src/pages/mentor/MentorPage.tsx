import React, { useState } from 'react';
import MentorStep1 from '../../components/mentor/MentorStep1';
import MentorStep2 from '../../components/mentor/MentorStep2';
import MentorStep3 from '../../components/mentor/MentorStep3';

export interface MentorData {
  exercise: string[];
  // 추가적인 필드들을 필요에 따라 여기에 정의할 수 있습니다.
}

const MentorPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [mentorData, setMentorData] = useState<MentorData>({ exercise: [] });

  const handleNext = (data: Partial<MentorData>) => {
    setMentorData(prevData => ({ ...prevData, ...data }));
    setStep(prevStep => prevStep + 1);
  };

  const handlePrev = (data: Partial<MentorData>) => {
    setMentorData(prevData => ({ ...prevData, ...data }));
    setStep(prevStep => prevStep - 1);
  };

  return (
    <div className="mentor-page container">
      {step === 1 && <MentorStep1 onNext={handleNext} data={mentorData} />}
      {step === 2 && <MentorStep2 onNext={handleNext} onPrev={handlePrev} data={mentorData} />}
      {step === 3 && <MentorStep3 onPrev={handlePrev} data={mentorData} />}
    </div>
  );
};

export default MentorPage;
