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
    setMentorData((prevData) => ({ ...prevData, ...data }));
    const requestData = { ...mentorData, ...data };
    console.log("Request Data:", requestData);

    try {
      await sendRequestWithRetry(requestData);
      console.log("Form completed successfully");
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const sendRequestWithRetry = async (requestData: any) => {
    let token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:8080/api/mentor", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // 토큰이 만료된 경우 새 토큰 요청
        const newToken = await refreshAuthToken();
        if (newToken) {
          localStorage.setItem("token", newToken);
          await axios.post("http://localhost:8080/api/mentor", requestData, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
        } else {
          throw new Error("Failed to refresh token");
        }
      } else {
        throw error;
      }
    }
  };
  const refreshAuthToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/refresh-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.token;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
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
