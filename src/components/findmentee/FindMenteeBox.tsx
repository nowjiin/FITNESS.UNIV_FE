import React from "react";
import "./FindMenteeBox.scss";
import Userimage from "./unnamed.webp";

const FindMenteeBox: React.FC = () => {
  return (
    <div className="find-mentee-box">
      <div className="userinformation">
        <img src={Userimage} alt="User" className="user-image" />
        <div className="user-name">이현우</div>
        <div className="user-info">
          <div>22살</div>
          <div>남자</div>
          <div>헬스</div>
          <div>서울 송파구 풍납동</div>
          <div>희망 수업료:10000원</div>
        </div>
      </div>
    </div>
  );
};

export default FindMenteeBox;
