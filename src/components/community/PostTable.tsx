import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import "./PostTable.scss";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

interface PostTableProps {
  posts: Post[];
}

const PostTable: React.FC<PostTableProps> = ({ posts }) => {
  const navigate = useNavigate();

  const handleCardClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <Row>
      {posts.map((post) => (
        <Col md={6} key={post.id} className="mb-4 w-100">
          <Card onClick={() => handleCardClick(post.id)} className="post-card">
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {post.author}
              </Card.Subtitle>
              <Card.Text>
                {post.content.length > 100
                  ? `${post.content.substring(0, 100)}...`
                  : post.content}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              작성일: {new Date(post.createdAt).toLocaleString()}
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PostTable;
