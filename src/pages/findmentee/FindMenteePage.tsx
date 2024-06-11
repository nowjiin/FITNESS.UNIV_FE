import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import NavMenuBar from "../../components/navbar/NavMenuBar";
import FindMenteeBox from "../../components/findmentee/FindMenteeBox";
import "./FindMenteePage.scss";
import SearchNavBar from "../../components/navbar/SearchNavBar";

function FindMenteePage() {
  // 예시로 10개의 FindMenteeBox 컴포넌트를 생성합니다.
  const menteeBoxes = Array.from({ length: 11 }).map((_, index) => (
    <FindMenteeBox key={index} />
  ));

  return (
    <>
      <NavBar />
      <NavMenuBar />
      <div className="content-wrapper">
        <SearchNavBar />
        <div className="find-mentee-container">{menteeBoxes}</div>
      </div>
    </>
  );
}

export default FindMenteePage;
