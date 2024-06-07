import NavBar from "../../components/navbar/NavBar";
import NavMenuBar from "../../components/navbar/NavMenuBar";
import CardGroups from "../../components/home/HomeCards";
import SignupOptions from "../../components/home/SignupOptions";
import SportsCategories from "../../components/home/SportsCategories";
import Reviews from "../../components/home/Reviews";
function HomePage() {
  return (
    <>
      <NavBar />
      <NavMenuBar />
      <CardGroups />
      <SignupOptions />
      <SportsCategories />
      <Reviews />
    </>
  );
}

export default HomePage;
