import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import SignInPage from "./pages/signin/SignInPage";
import SignUpPage from "./pages/signup/SignUpPage";
import RoleSelectPage from "./pages/role/RoleSelect";
import MentorPage from "./pages/mentor/MentorPage";
import MenteePage from "./pages/mentee/MenteePage";
import PaymentSuccessPage from "./pages/paymentsuccess/Success";
import RefundButton from "./components/refund/Refundbutton";
import FindMenteePage from "./pages/findmentee/FindMenteePage";
import FindMentorPage from "./pages/findmentor/FindMentorPage";
import MyPage from "./pages/mypage/MyPage";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatButton from "./components/common/ChatButton";
import CommunityPage from "./pages/community/CommunityPage";
import MentorProfileDetailPage from "./pages/findmentor/MentorProfileDetailPage";
import MenteeProfileDetailPage from "./pages/findmentee/MenteeProfileDetailPage";
import PostDetailPage from "./pages/community/PostDetailPage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/role" element={<RoleSelectPage />} />
          <Route path="/mentor" element={<MentorPage />} />
          <Route path="/mentee" element={<MenteePage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/refund" element={<RefundButton />} />
          <Route path="/findmentee" element={<FindMenteePage />} />
          <Route path="/findmentor" element={<FindMentorPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/chatbutton" element={<ChatButton />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/findmentor/:id" element={<MentorProfileDetailPage />} />
          <Route path="/findmentee/:id" element={<MenteeProfileDetailPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
