import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import LoginedNavBar from "../../components/navbar/LoginedNavBar";
import NavBar from "../../components/navbar/NavBar";
import NavMenuBar from "../../components/navbar/NavMenuBar";
import Notice from "../../components/community/Notice";
import PostTable from "../../components/community/PostTable";
import PostModal from "../../components/community/PostModal";
import { handleTokenError } from "../../auth/tokenService";
import "./CommunityPage.scss";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

const CommunityPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [postCount, setPostCount] = useState(0);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인한 사용자만 이용 가능합니다! 로그인해주세요!");
        navigate("/");
        return;
      }

      const userResponse = await axios.get(`${backendUrl}/api/get-user-name`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserName(userResponse.data);

      const postsResponse = await axios.get<Post[]>(`${backendUrl}/api/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsAuthenticated(true);
      setPosts(postsResponse.data);
      setPostCount(
        postsResponse.data.filter((post) => post.author === userResponse.data)
          .length
      );
    } catch (error) {
      await handleTokenError(error, fetchData);
    }
  }, [backendUrl, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인한 사용자만 이용 가능합니다! 로그인해주세요!");
        navigate("/");
        return;
      }
      const response = await axios.get<Post[]>(`${backendUrl}/api/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsAuthenticated(true);
      setPosts(response.data);
      setPostCount(
        response.data.filter((post) => post.author === userName).length
      );
    } catch (error) {
      await handleTokenError(error, fetchPosts);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      await axios.post(
        `${backendUrl}/api/posts`,
        { ...newPost, author: userName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPosts();
      handleCloseModal();
      setNewPost({ title: "", content: "" });
    } catch (error) {
      await handleTokenError(error, handleSubmit);
    }
  };

  return (
    <>
      {isAuthenticated ? <LoginedNavBar /> : <NavBar />}
      <NavMenuBar />
      <Container className="mt-4">
        <Row>
          <Col md={3}>
            <Card className="mb-4 align-items-center">
              <Card.Body className="align-items-center p-0">
                <div className="text-center">
                  <img
                    src="../common/profile.webp"
                    alt="profile"
                    className="user-image m-0"
                  />
                  <Card.Title>{userName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    작성글 : {postCount} | 댓글 : 0
                  </Card.Subtitle>
                </div>
              </Card.Body>
            </Card>
            <Button
              variant="primary"
              onClick={handleShowModal}
              className="mt-2"
            >
              글쓰기
            </Button>
          </Col>
          <Col md={9}>
            <Notice />
            <PostTable posts={posts} />
          </Col>
        </Row>

        <PostModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          newPost={newPost}
        />
      </Container>
    </>
  );
};

export default CommunityPage;
