import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginedNavBar from "../../components/navbar/LoginedNavBar";
import NavMenuBar from "../../components/navbar/NavMenuBar";
import SearchNavBar from "../../components/navbar/SearchNavBar";
import MentorProfileCard from "../../components/findmentor/MentorProfileCard";
import { MentorProfile } from "../../components/findmentor/MentorProfile";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getToken, handleTokenError } from "../../auth/tokenService";

const FindMentorPage: React.FC = () => {
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const token = getToken();
        if (!token) {
          alert("로그인한 사용자만 이용 가능합니다! 로그인해주세요!");
          navigate("/");
          return;
        }

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
        await handleTokenError(error, fetchMentors);
      }
    };

    fetchMentors();
  }, [navigate]);

  return (
    <>
      <LoginedNavBar />
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
