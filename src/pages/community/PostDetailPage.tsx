import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getToken, handleTokenError } from "../../auth/tokenService";
import LoginedNavBar from "../../components/navbar/LoginedNavBar";
import NavMenuBar from "../../components/navbar/NavMenuBar";
import "./PostDetailPage.scss";
interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = getToken();
        if (!token) {
          alert("로그인한 사용자만 이용 가능합니다! 로그인해주세요!");
          navigate("/");
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPost(response.data);
        setEditTitle(response.data.title);
        setEditContent(response.data.content);
      } catch (error) {
        await handleTokenError(error, fetchPost);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleUpdate = async () => {
    try {
      const token = getToken();
      if (!token) {
        alert("로그인한 사용자만 이용 가능합니다! 로그인해주세요!");
        navigate("/");
        return;
      }

      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}`,
        {
          title: editTitle,
          content: editContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false);
      setPost({ ...post, title: editTitle, content: editContent } as Post);
    } catch (error) {
      await handleTokenError(error, handleUpdate);
    }
  };

  const handleDelete = async () => {
    try {
      const token = getToken();
      if (!token) {
        alert("로그인한 사용자만 이용 가능합니다! 로그인해주세요!");
        navigate("/");
        return;
      }

      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/community");
    } catch (error) {
      await handleTokenError(error, handleDelete);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <LoginedNavBar />
      <NavMenuBar />
      <Container className="mt-4">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Card>
              <Card.Body>
                {isEditing ? (
                  <>
                    <Form.Group controlId="formTitle">
                      <Form.Label>제목</Form.Label>
                      <Form.Control
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formContent" className="mt-3">
                      <Form.Label>내용</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      className="mr-3"
                      onClick={handleUpdate}
                    >
                      저장
                    </Button>
                    <Button
                      variant="secondary"
                      className="mr-3"
                      onClick={() => setIsEditing(false)}
                    >
                      취소
                    </Button>
                  </>
                ) : (
                  <>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {post.author}
                    </Card.Subtitle>
                    <Card.Text>{post.content}</Card.Text>
                    <Card.Footer className="text-muted">
                      작성일: {new Date(post.createdAt).toLocaleString()}
                    </Card.Footer>
                    <Button
                      variant="primary"
                      className="mr-3"
                      onClick={() => setIsEditing(true)}
                    >
                      수정
                    </Button>
                    <button className="edit-btn">
                      수정
                      <svg className="edit-btn-svg" viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                      </svg>
                    </button>
                    <Button
                      variant="danger"
                      className="mr-3"
                      onClick={handleDelete}
                    >
                      삭제
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PostDetailPage;
