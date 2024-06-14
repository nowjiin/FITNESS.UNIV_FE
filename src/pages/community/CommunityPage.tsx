import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import LoginedNavBar from "../../components/navbar/LoginedNavBar";
import NavBar from "../../components/navbar/NavBar";
import NavMenuBar from "../../components/navbar/NavMenuBar";
import { refreshAccessToken } from "../../auth/refreshAccessToken";
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
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인한 사용자만 이용 가능합니다! 로그인해주세요!");
        navigate("/");
        return;
      }
      const response = await axios.get(`${backendUrl}/api/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsAuthenticated(true);
      setPosts(response.data);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        try {
          const newToken = await refreshAccessToken();
          localStorage.setItem("accessToken", newToken);
          await fetchPosts(); // Retry fetching the posts with the new token
        } catch (refreshError) {
          alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
          navigate("/");
        }
      } else {
        console.error("Error fetching posts", error);
      }
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

      await axios.post(`${backendUrl}/api/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPosts();
      handleCloseModal();
      setNewPost({ title: "", content: "", author: "" });
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        try {
          const newToken = await refreshAccessToken();
          localStorage.setItem("accessToken", newToken);
          await handleSubmit();
        } catch (refreshError) {
          alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
          navigate("/");
        }
      } else {
        console.error("Error creating post", error);
      }
    }
  };

  return (
    <>
      <LoginedNavBar />
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
                  <Card.Title>이름</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    작성글 : 0 | 댓글 : 0
                  </Card.Subtitle>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={9}>
            <Button variant="primary" onClick={handleShowModal}>
              Create New Post
            </Button>
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{new Date(post.createdAt).toLocaleString()}</td>
                    <td>{new Date(post.updatedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  value={newPost.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter content"
                  name="content"
                  value={newPost.content}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter author"
                  name="author"
                  value={newPost.author}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default CommunityPage;
