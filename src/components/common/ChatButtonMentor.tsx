import React, { useState } from "react";
import ChatModalMentor from "../modal/ChatModalMentor"; // 경로를 조정하세요
import "./ChatButton.scss";

interface Room {
  roomNum: string;
}

interface ChatButtonMentorProps {
  mentorId: string;
  mentorName: string;
}

const ChatButtonMentor: React.FC<ChatButtonMentorProps> = ({
  mentorId,
  mentorName,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([{ roomNum: mentorId }]);

  const handleChatButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={handleChatButtonClick}>
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              ></path>
            </svg>
          </div>
        </div>
        <span>채팅하기</span>
      </button>

      <ChatModalMentor
        show={showModal}
        handleClose={handleCloseModal}
        rooms={rooms}
        mentorName={mentorName}
      />
    </div>
  );
};

export default ChatButtonMentor;
