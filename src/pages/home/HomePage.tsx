import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import LoginedNavBar from "../../components/navbar/LoginedNavBar";
import NavMenuBar from "../../components/navbar/NavMenuBar";
import SignupOptions from "../../components/home/SignupOptions";
import SportsCategories from "../../components/home/SportsCategories";
import Reviews from "../../components/home/Reviews";
import ServiceShortcut from "../../components/home/ServiceShortcut";

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setIsAuthenticated(true);
      // 토큰 파라미터를 URL에서 제거
      navigate("/", { replace: true });
    } else {
      const storedAccessToken = localStorage.getItem("accessToken");
      if (storedAccessToken) {
        setIsAuthenticated(true);
      } else {
        console.error("토큰이 없음. 첫 로그인");
        setIsAuthenticated(false);
      }
    }
  }, [location, navigate]);

  return (
    <>
      {isAuthenticated ? <LoginedNavBar /> : <NavBar />}
      <NavMenuBar />
      <ServiceShortcut />
      <SignupOptions />
      <SportsCategories />
      <Reviews />
    </>
  );
}

export default HomePage;
