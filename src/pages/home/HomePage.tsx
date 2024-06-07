import NavBar from "../../components/navbar/NavBar";
import NavMenuBar from "../../components/navbar/NavMenuBar";
import CardGroups from "../../components/home/HomeCards";
import SignupOptions from "../../components/home/SignupOptions";
import SportsCategories from "../../components/home/SportsCategories";
function HomePage() {
  return (
    <>
      <NavBar />
      <NavMenuBar />
      <CardGroups />
      <SignupOptions />
      <SportsCategories />
    </>
  );
}

export default HomePage;
