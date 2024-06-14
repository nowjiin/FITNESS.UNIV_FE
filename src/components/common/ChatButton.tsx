import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ChatModal from "../modal/ChatModal"; // ChatModal 컴포넌트의 경로를 확인

interface Room {
  roomNum: string;
}

const ChatButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);

  const handleChatButtonClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/chat/createRoom"
      );
      const { roomNum } = response.data;
      setRooms((prevRooms) => [...prevRooms, { roomNum }]);
      setShowModal(true);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button variant="outline-success" onClick={handleChatButtonClick}>
        채팅하기
      </Button>
      <ChatModal
        show={showModal}
        handleClose={handleCloseModal}
        rooms={rooms}
      />
    </div>
  );
};

export default ChatButton;
