import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface PostModalProps {
  showModal: boolean;
  handleCloseModal: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: () => void;
  newPost: {
    title: string;
    content: string;
  };
}

const PostModal: React.FC<PostModalProps> = ({
  showModal,
  handleCloseModal,
  handleChange,
  handleSubmit,
  newPost,
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>게시글 작성</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              placeholder="제목을 입력하세요."
              name="title"
              value={newPost.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="내용을 입력하세요"
              name="content"
              value={newPost.content}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          글쓰기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostModal;
