import { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import LoginedNavBar from "../../components/navbar/LoginedNavBar";
import NavMenuBar from "../../components/navbar/NavMenuBar";
import CardGroups from "../../components/home/HomeCards";
import SignupOptions from "../../components/home/SignupOptions";
import SportsCategories from "../../components/home/SportsCategories";
import Reviews from "../../components/home/Reviews";
function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      {isAuthenticated ? <LoginedNavBar /> : <NavBar />}
      <NavMenuBar />
      <CardGroups />
      <SignupOptions />
      <SportsCategories />
      <Reviews />
    </>
  );
}

export default HomePage;
