import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import SignInPage from "./pages/signin/SignInPage";
import SignUpPage from "./pages/signup/SignUpPage";
import LoginedPage from "./pages/home/LoginedPage";
import RoleSelectPage from "./pages/role/RoleSelect";
import MentorPage from "./pages/mentor/MentorPage";
import Paybutton from "./components/payment/Paybuttom";

import "bootstrap/dist/css/bootstrap.min.css";
import Chatpage from "./pages/chat/Chatpage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/home" element={<LoginedPage />} />
          <Route path="/role" element={<RoleSelectPage />} />
          <Route path="/chat" element={<Chatpage />} />
          <Route path="/mentor" element={<MentorPage />} />
          <Route path="/paybutton" element={<Paybutton />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
