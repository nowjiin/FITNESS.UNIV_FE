import "./NavBar.scss";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
function NavBar() {
  return (
    <div id="navbar-wrap">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className="navbar-logo" href="/">
            FITNESS.UNIV
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="/sign-up">
                <Button className="SignUpBtn" variant="info" size="sm">
                  로그인/회원가입
                </Button>
              </Nav.Link>
              <Nav.Link href="/sign-in">
                <Button className="SignInBtn" variant="info" size="sm">
                  고객센터
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
