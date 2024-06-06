import NavBar from "../../components/navbar/NavBar";
import NavMenuBar from "../../components/navbar/NavMenuBar";
import CardGroups from "../../components/home/HomeCards";
import SignupOptions from "../../components/home/SignupOptions";
function HomePage() {
  return (
    <>
      <NavBar />
      <NavMenuBar />
      <CardGroups />
      <SignupOptions />
    </>
  );
}

export default HomePage;
