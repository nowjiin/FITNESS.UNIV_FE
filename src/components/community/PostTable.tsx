import React from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

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

  const handleRowClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  return (
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
          <tr key={post.id} onClick={() => handleRowClick(post.id)}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.author}</td>
            <td>{new Date(post.createdAt).toLocaleString()}</td>
            <td>{new Date(post.updatedAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PostTable;
