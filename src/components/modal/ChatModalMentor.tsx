import React, { useState } from "react";
import "./ChatModal.scss";
import Chatpage from "../../pages/chat/Chatpage"; // Chatpage 컴포넌트의 경로를 확인

interface ChatModalProps {
  show: boolean;
  handleClose: () => void;
  rooms: { roomNum: string }[];
  mentorName: string;
}

const ChatModalMentor: React.FC<ChatModalProps> = ({
  show,
  handleClose,
  rooms,
  mentorName,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const handleRoomClick = (roomNum: string) => {
    setSelectedRoom(roomNum);
  };

  const handleBackClick = () => {
    setSelectedRoom(null);
  };

  return (
    <div className={`chat-modal ${show ? "show" : ""}`}>
      <div className="chat-modal-content">
        {selectedRoom ? (
          <Chatpage roomNum={selectedRoom} handleBackClick={handleBackClick} />
        ) : (
          <>
            <button onClick={handleClose}>채팅방 닫기</button>
            {rooms.map((room, index) => (
              <div
                key={index}
                className="profile-section"
                onClick={() => handleRoomClick(room.roomNum)}
              >
                <img src="../../common/profile.webp" alt="Profile" />
                <div className="profile-info">
                  <h2>{mentorName} 강사님과의 채팅방</h2>
                  <p>Status Message</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatModalMentor;
