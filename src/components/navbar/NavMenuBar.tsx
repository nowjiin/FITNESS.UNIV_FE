import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.scss";

function NavMenuBar() {
  return (
    <div id="navbar-wrap">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0">
              <Nav.Link href="#action1">운동 찾기</Nav.Link>
              <Nav.Link href="#action2">커뮤니티</Nav.Link>
              <Nav.Link href="/findmentee">
                수강생 찾기
                <img
                  src="./buttons/icon-arrow-right-top.png"
                  className=""
                  alt="arrow"
                />
              </Nav.Link>
              <Nav.Link href="/findmentor">
                트레이너 찾기
                <img
                  src="./buttons/icon-arrow-right-top.png"
                  className=""
                  alt="arrow"
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavMenuBar;
