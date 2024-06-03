import React, { useState } from "react";
import axios from "axios";
import MentorStep1 from "../../components/mentor/step1/MentorStep1";
import MentorStep2 from "../../components/mentor/step2/MentorStep2";
import MentorStep3 from "../../components/mentor/step3/MentorStep3";
import MentorStep4 from "../../components/mentor/step4/MentorStep4";
import MentorStep5 from "../../components/mentor/step5/MentorStep5";
import "../../components/mentor/common.scss";
import "./MentorPage.scss";
import ProgressBar from "../../components/modal/ProgressBar";
export interface MentorData {
  exercise: string[];
  regions: string[];
  gender?: string;
  rate?: string;
  details?: string;
  university?: string;
  major?: string;
  studentId?: string;
  enrollmentStatus?: string;
  certifications?: string;
}

const MentorPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [mentorData, setMentorData] = useState<MentorData>({
    exercise: [],
    regions: [],
    gender: "",
    rate: "",
    details: "",
    university: "",
    major: "",
    studentId: "",
    enrollmentStatus: "",
    certifications: "",
  });

  const handleNext = (data: Partial<MentorData>) => {
    setMentorData((prevData) => ({ ...prevData, ...data }));
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = (data: Partial<MentorData>) => {
    setMentorData((prevData) => ({ ...prevData, ...data }));
    setStep((prevStep) => prevStep - 1);
  };

  const handleComplete = async (data: Partial<MentorData>) => {
    const finalData = { ...mentorData, ...data };
    setMentorData(finalData);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/mentor",
        finalData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("There was a problem with the axios operation:", error);
    }
  };

  return (
    <div
      className="mentor-page container text-center mt-5"
      style={{ maxWidth: "600px" }}
    >
      <button className="btn btn-info mb-5">Logo</button>
      <h2>회원가입</h2>
      <div className="mentor-box mx-auto mt-4 p-4 text-center">
        <ProgressBar
          currentStep={step}
          totalSteps={5}
          timeEstimate="소요시간 약 3분"
        />
        {step === 1 && <MentorStep1 onNext={handleNext} data={mentorData} />}
        {step === 2 && (
          <MentorStep2
            onNext={handleNext}
            onPrev={handlePrev}
            data={mentorData}
          />
        )}
        {step === 3 && (
          <MentorStep3
            onPrev={handlePrev}
            onNext={handleNext}
            data={mentorData}
          />
        )}
        {step === 4 && (
          <MentorStep4
            onPrev={handlePrev}
            onNext={handleNext}
            data={mentorData}
          />
        )}
        {step === 5 && (
          <MentorStep5
            onPrev={handlePrev}
            onComplete={handleComplete}
            data={mentorData}
          />
        )}
      </div>
    </div>
  );
};

export default MentorPage;
