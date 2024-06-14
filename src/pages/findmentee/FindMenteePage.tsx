import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import LoginedNavBar from "../../components/navbar/LoginedNavBar";
import NavMenuBar from "../../components/navbar/NavMenuBar";
import SearchNavBar from "../../components/navbar/SearchNavBar";
import MenteeProfileCard from "../../components/findmentee/MenteeProfileCard";
import { MenteeProfile } from "../../components/findmentee/MenteeProfile";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FindMenteePage: React.FC = () => {
  const [mentees, setMentees] = useState<MenteeProfile[]>([]);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        await fetchMenteesWithToken();
      } catch (error) {
        console.error(
          "There was an error fetching the mentee profiles!",
          error
        );
      }
    };

    const fetchMenteesWithToken = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/mentee`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsAuthenticated(true);
        setMentees(response.data);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 401
        ) {
          // Token might be expired, try to refresh it
          try {
            await refreshAccessToken();
            // Retry fetching mentees with the new token
            await fetchMenteesWithToken();
          } catch (refreshError) {
            alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
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

    fetchMentees();
  }, [navigate]);

  return (
    <>
      {isAuthenticated ? <LoginedNavBar /> : <NavBar />}
      <NavMenuBar />
      <SearchNavBar />
      <Container className="mt-2">
        {mentees
          .reduce((rows, mentee, index) => {
            if (index % 3 === 0) rows.push([]);
            rows[rows.length - 1].push(mentee);
            return rows;
          }, [] as MenteeProfile[][])
          .map((menteeRow, rowIndex) => (
            <Row key={rowIndex} className="mb-4">
              {menteeRow.map((mentee) => (
                <Col
                  key={mentee.id}
                  xs={12}
                  md={4}
                  className="d-flex justify-content-center"
                >
                  <MenteeProfileCard {...mentee} />
                </Col>
              ))}
            </Row>
          ))}
      </Container>
    </>
  );
};

export default FindMenteePage;
