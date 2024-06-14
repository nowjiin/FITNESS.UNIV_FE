import React, { useState } from "react";
import MenteeStep1 from "../../components/mentee/step1/MenteeStep1";
import MenteeStep2 from "../../components/mentee/step2/MenteeStep2";
import MenteeStep3 from "../../components/mentee/step3/MenteeStep3";
import MenteeStep4 from "../../components/mentee/step4/MenteeStep4";
import MenteeStep5 from "../../components/mentee/step5/MenteeStep5";
import axios from "axios";

import "../../components/mentee/common.scss";
import "./MenteePage.scss";
import ProgressBar from "../../components/modal/ProgressBar";

export interface MenteeData {
  exercises: string[];
  regions: string[];
  gender?: string;
  rate?: string;
  age?: string;
}

const MenteePage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [menteeData, setMenteeData] = useState<MenteeData>({
    exercises: [],
    regions: [],
    gender: "",
    rate: "",
    age: "",
  });

  const handlePrev = (data: Partial<MenteeData>) => {
    setMenteeData((prevData) => ({ ...prevData, ...data }));
    setStep((prevStep) => prevStep - 1);
  };

  const handleNext = (data: Partial<MenteeData>) => {
    setMenteeData((prevData) => ({ ...prevData, ...data }));
    setStep((prevStep) => prevStep + 1);
  };

  const handleComplete = async (data: Partial<MenteeData>) => {
    const finalData = { ...menteeData, ...data };
    setMenteeData(finalData);
    console.log("Final Data to be sent to server:", finalData);

    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);

    try {
      const accesstoken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/mentee`,
        finalData,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );
      console.log("Profile saved successfully:", response.data);
      window.location.href = "/";
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div
      className="mentee-page container text-center mt-5"
      style={{ maxWidth: "600px" }}
    >
      <button className="btn btn-info mb-5">Logo</button>
      <h2>회원가입</h2>
      <div className="mentee-box mx-auto mt-4 p-4 text-center">
        <ProgressBar
          currentStep={step}
          totalSteps={5}
          timeEstimate="소요시간 약 3분"
        />
        {step === 1 && <MenteeStep1 onNext={handleNext} data={menteeData} />}
        {step === 2 && (
          <MenteeStep2
            onNext={handleNext}
            onPrev={handlePrev}
            data={menteeData}
          />
        )}
        {step === 3 && (
          <MenteeStep3
            onNext={handleNext}
            onPrev={handlePrev}
            data={menteeData}
          />
        )}
        {step === 4 && (
          <MenteeStep4
            onNext={handleNext}
            onPrev={handlePrev}
            data={menteeData}
          />
        )}
        {step === 5 && (
          <MenteeStep5
            onPrev={handlePrev}
            onComplete={handleComplete}
            data={menteeData}
          />
        )}
      </div>
    </div>
  );
};

export default MenteePage;
