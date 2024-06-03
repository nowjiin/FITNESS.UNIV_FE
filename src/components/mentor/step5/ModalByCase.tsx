import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SearchInput from "../../common/SearchInput";
import "./ModalByCase.scss";

interface ModalByCaseProps {
  show: boolean;
  title: string;
  content: React.ReactNode;
  onClose: () => void;
  onSearch: (query: string) => void;
}

const ModalByCase: React.FC<ModalByCaseProps> = ({
  show,
  title,
  content,
  onClose,
  onSearch,
}) => {
  const handleSearch = (query: string) => {
    onSearch(query);
  };

  return (
    <Modal show={show} onHide={onClose} className="custom-modal">
      <Modal.Header className="modal-header">
        <Modal.Title>{title}</Modal.Title>
        <button type="button" className="custom-close-button" onClick={onClose}>
          <img src="./buttons/icon-x-circle.png" alt="x" />
        </button>
        <SearchInput placeholder="검색" onSearch={handleSearch} />
      </Modal.Header>

      <Modal.Body className="modal-body-custom">{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalByCase;
