import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import NavMenuBar from "../../components/navbar/NavMenuBar";
import SearchNavBar from "../../components/navbar/SearchNavBar";
import MentorProfileCard from "../../components/findmentor/MentorProfileCard";
import { MentorProfile } from "../../components/findmentor/MentorProfile";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { refreshAccessToken } from "../../auth/refreshAccessToken";

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
            const newToken = await refreshAccessToken();
            // Retry fetching mentors with the new token
            const response = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}/api/mentor`,
              {
                headers: {
                  Authorization: `Bearer ${newToken}`,
                },
              }
            );
            setMentors(response.data);
          } catch (refreshError) {
            console.error("Token refresh failed", refreshError);
            navigate("/"); // Redirect to the main page or login page
          }
        } else {
          throw error;
        }
      }
    };

    fetchMentors();
  }, [navigate]);

  return (
    <>
      <NavBar />
      <NavMenuBar />
      <SearchNavBar />
      <Container className="mt-2">
        {mentors
          .reduce((rows, mentor, index) => {
            if (index % 3 === 0) rows.push([]);
            rows[rows.length - 1].push(mentor);
            return rows;
          }, [] as MentorProfile[][])
          .map((mentorRow, rowIndex) => (
            <Row key={rowIndex} className="mb-4">
              {mentorRow.map((mentor) => (
                <Col
                  key={mentor.id}
                  xs={12}
                  md={4}
                  className="d-flex justify-content-center"
                >
                  <MentorProfileCard {...mentor} />
                </Col>
              ))}
            </Row>
          ))}
      </Container>
    </>
  );
};

export default FindMentorPage;
