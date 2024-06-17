import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import LoginedNavBar from "../../components/navbar/LoginedNavBar";
import NavMenuBar from "../../components/navbar/NavMenuBar";
import SearchNavBar from "../../components/navbar/SearchNavBar";
import MenteeProfileCard from "../../components/findmentee/MenteeProfileCard";
import { MenteeProfile } from "../../components/findmentee/MenteeProfile";
import { getToken, handleTokenError } from "../../auth/tokenService";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FindMenteePage: React.FC = () => {
  const [mentees, setMentees] = useState<MenteeProfile[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const token = getToken();
        if (!token) {
          alert("로그인한 사용자만 이용 가능합니다! 로그인해주세요!");
          navigate("/");
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/mentee`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMentees(response.data);
      } catch (error) {
        await handleTokenError(error, fetchMentees);
      }
    };
    fetchMentees();
  }, [navigate]);

  return (
    <>
      <LoginedNavBar />
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
