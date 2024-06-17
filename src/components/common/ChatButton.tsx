import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ChatModal from "../modal/ChatModal"; // ChatModal 컴포넌트의 경로를 확인
import {
  getToken,
  setToken,
  refreshAccessToken,
  handleTokenError,
} from "../../auth/tokenService"; // getToken, setToken, refreshToken 함수의 경로를 확인
import "./ChatButton.scss";

interface Room {
  roomNum: string;
}

const ChatButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    // Axios 인터셉터 설정
    const requestInterceptor = axios.interceptors.request.use(
      async (config) => {
        let token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const newToken = await refreshAccessToken();
            setToken(newToken);
            axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
            return axios(originalRequest);
          } catch (err) {
            console.error("Error refreshing token:", err);
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );

    // 컴포넌트 언마운트 시 인터셉터 제거
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const handleChatButtonClick = async () => {
    const token = getToken();
    if (!token) {
      alert("로그인한 사용자만 이용 가능합니다! 로그인해주세요!");
      return;
    }

    const existingRoom = rooms.find((room) => room.roomNum === token);
    if (existingRoom) {
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/chat/createRoom`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { roomNum } = response.data;

      // 기존에 있는 방을 확인하여 중복되지 않도록 추가
      setRooms((prevRooms) => {
        if (prevRooms.some((room) => room.roomNum === roomNum)) {
          return prevRooms;
        }
        return [...prevRooms, { roomNum }];
      });

      setShowModal(true);
    } catch (error) {
      await handleTokenError(error, handleChatButtonClick);
    }
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
      <ChatModal
        show={showModal}
        handleClose={handleCloseModal}
        rooms={rooms}
      />
    </div>
  );
};

export default ChatButton;
