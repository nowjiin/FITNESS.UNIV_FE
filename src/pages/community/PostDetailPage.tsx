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
      navigate("/posts");
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
                      className="mt-3"
                      onClick={handleUpdate}
                    >
                      저장
                    </Button>
                    <Button
                      variant="secondary"
                      className="mt-3 ml-2"
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
                      <br />
                      수정일: {new Date(post.updatedAt).toLocaleString()}
                    </Card.Footer>
                    <Button
                      variant="primary"
                      className="mt-3"
                      onClick={() => setIsEditing(true)}
                    >
                      수정
                    </Button>
                    <Button
                      variant="danger"
                      className="mt-3 ml-2"
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
