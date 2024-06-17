import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./PostModal.scss";
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
        <button className="noselect cancel-btn" onClick={handleCloseModal}>
          <span className="text">닫기</span>
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
            </svg>
          </span>
        </button>
        <button className="noselect write-btn" onClick={handleSubmit}>
          <span className="text">글쓰기</span>
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M3 17.25V21h3.75l11.065-11.065-3.75-3.75L3 17.25zm18.71-11.71a1.004 1.004 0 0 0 0-1.42l-2.83-2.83a1.004 1.004 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
            </svg>
          </span>
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostModal;
