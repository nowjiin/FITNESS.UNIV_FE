import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // React Router 사용
import "../chat/Chatpage.scss";
import profileImage from "../../assets/chat/profile.png";
import "font-awesome/css/font-awesome.min.css"; // FontAwesome Icons
import axios from "axios"; // axios import
import {
  getToken,
  setToken,
  refreshAccessToken,
  handleTokenError,
} from "../../auth/tokenService"; // Token Service import

interface ChatData {
  sender: string;
  userId: string;
  createdAt: string;
  msg: string;
}

interface ChatpageProps {
  roomNum: string;
  handleBackClick: () => void;
}

const Chatpage: React.FC<ChatpageProps> = ({ roomNum, handleBackClick }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

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
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axios(originalRequest);
          } catch (err) {
            console.error("Error refreshing token:", err);
            alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
            window.location.href = "/"; // Redirect to login
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = getToken();
        console.log("Token being sent:", `Bearer ${token}`);

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/auth/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data;
          setUsername(data.username);
          setUserId(data.userId);
        } else {
          console.error("Failed to fetch user info");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const usernameElement: HTMLElement | null =
      document.querySelector("#username");
    if (usernameElement) {
      usernameElement.innerHTML = username || "";
    }
  }, [username]);

  const initMyMessage = useCallback((data: ChatData): void => {
    let chatBox: HTMLElement | null = document.querySelector("#chat-box");

    if (chatBox) {
      let sendBox = document.createElement("div");
      sendBox.className = "outgoing_msg";

      sendBox.innerHTML = getSendMsgBox(data);
      chatBox.append(sendBox);

      document.documentElement.scrollTop = document.body.scrollHeight;
    }
  }, []);

  const initYourMessage = useCallback((data: ChatData): void => {
    let chatBox: HTMLElement | null = document.querySelector("#chat-box");

    if (chatBox) {
      let receivedBox = document.createElement("div");
      receivedBox.className = "received_msg";

      receivedBox.innerHTML = getReceiveMsgBox(data);
      chatBox.append(receivedBox);

      document.documentElement.scrollTop = document.body.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (roomNum && userId) {
      const eventSource = new EventSource(
        `${process.env.REACT_APP_BACKEND_URL}/chat/roomNum/${roomNum}`
      );

      eventSource.onmessage = (event) => {
        const data: ChatData = JSON.parse(event.data);
        if (data.userId === userId) {
          initMyMessage(data);
        } else {
          initYourMessage(data);
        }
      };

      return () => {
        eventSource.close();
      };
    }
  }, [roomNum, userId, initMyMessage, initYourMessage]);

  const addMessage = useCallback(async (): Promise<void> => {
    let msgInput: HTMLInputElement | null =
      document.querySelector("#chat-outgoing-msg");

    if (msgInput && username && userId && roomNum) {
      let chat = {
        sender: username,
        userId: userId,
        roomNum: roomNum,
        msg: msgInput.value,
      };

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/chat`, chat, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      msgInput.value = "";
    }
  }, [username, userId, roomNum]);

  function getSendMsgBox(data: ChatData): string {
    let md = data.createdAt.substring(5, 10);
    let tm = data.createdAt.substring(11, 16);
    let convertTime = tm + " | " + md;

    return `<div class="sent_msg">
      <p>${data.msg}</p>
      <span class="time_date"> ${convertTime} / <b>${data.sender}</b> </span>
    </div>`;
  }

  function getReceiveMsgBox(data: ChatData): string {
    let md = data.createdAt.substring(5, 10);
    let tm = data.createdAt.substring(11, 16);
    let convertTime = tm + " | " + md;

    return `<div class="received_withd_msg">
      <p>${data.msg}</p>
      <span class="time_date"> ${convertTime} / <b>${data.sender}</b> </span>
    </div>`;
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addMessage();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div id="user_chat_data" className="user_chat_data">
            <button onClick={handleBackClick}>뒤로가기</button>
            <div className="profile_name">
              &nbsp;&nbsp;&nbsp;&nbsp;
              <img
                src={profileImage}
                className="mr-3 rounded-circle"
                alt="Profile"
              />{" "}
              &nbsp;&nbsp;
              <span id="username"></span>
            </div>
            <div className="container-fluid chat_section" id="chat-box">
              {/* 채팅 내용이 여기에 표시됩니다. */}
            </div>
            <div className="type_msg">
              <div className="input_msg_write">
                <input
                  id="chat-outgoing-msg"
                  type="text"
                  className="write_msg"
                  placeholder="Type a message"
                  onKeyPress={handleKeyPress}
                />
                <button
                  id="chat-outgoing-button"
                  className="msg_send_btn"
                  type="button"
                  onClick={addMessage}
                >
                  <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatpage;
