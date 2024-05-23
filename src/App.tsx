import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import SignInPage from "./pages/signin/SignInPage";
import SignUpPage from "./pages/signup/SignUpPage";
import LoginedPage from "./pages/home/LoginedPage";
import RoleSelectPage from "./pages/role/RoleSelect";

import "bootstrap/dist/css/bootstrap.min.css";
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
