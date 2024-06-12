// FindMentorPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import NavMenuBar from "../../components/navbar/NavMenuBar";
import SearchNavBar from "../../components/navbar/SearchNavBar";
import MentorProfileCard from "../../components/findmentor/MentorProfileCard";
import { MentorProfile } from "../../components/findmentor/MentorProfile";
import "./FindMentorPage.scss";
import axios from "axios";

const FindMentorPage: React.FC = () => {
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        await fetchMentorsWithToken();
      } catch (error) {
        console.error(
          "There was an error fetching the mentor profiles!",
          error
        );
      }
    };

    const fetchMentorsWithToken = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/mentor`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMentors(response.data);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 401
        ) {
          // Token might be expired, try to refresh it
          try {
            await refreshAccessToken();
            // Retry fetching mentors with the new token
            await fetchMentorsWithToken();
          } catch (refreshError) {
            console.error("Token refresh failed", refreshError);
            navigate("/"); // Redirect to the main page or login page
          }
        } else {
          throw error;
        }
      }
    };

    const refreshAccessToken = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/refresh-token`,
        { refreshToken }
      );

      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
    };

    fetchMentors();
  }, [navigate]);
  return (
    <>
      <NavBar />
      <NavMenuBar />
      <div className="content-wrapper">
        <SearchNavBar />
        <div className="find-mentor-container">
          {mentors.map((mentor) => (
            <MentorProfileCard key={mentor.id} {...mentor} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FindMentorPage;
