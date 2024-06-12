import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import SignInPage from "./pages/signin/SignInPage";
import SignUpPage from "./pages/signup/SignUpPage";
import LoginedPage from "./pages/home/LoginedPage";
import RoleSelectPage from "./pages/role/RoleSelect";
import MentorPage from "./pages/mentor/MentorPage";
import MenteePage from "./pages/mentee/MenteePage";
import Paybutton from "./components/payment/Paybuttom";
import PaymentSuccessPage from "./pages/paymentsuccess/Success";
import RefundButton from "./components/refund/Refundbutton";
import FindMenteePage from "./pages/findmentee/FindMenteePage";
import FindMentorPage from "./pages/findmentor/FindMentorPage";
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
          <Route path="/mentee" element={<MenteePage />} />
          <Route path="/paybutton" element={<Paybutton />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/refund" element={<RefundButton />} />
          <Route path="/findmentee" element={<FindMenteePage />} />
          <Route path="/findmentor" element={<FindMentorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
