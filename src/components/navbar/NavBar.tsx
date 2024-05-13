import "./NavBar.scss";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
function NavBar() {
  return (
    <div id="navbar-wrap">
      <Navbar collapseOnSelect expand="sm" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className="navbar-logo" href="/">
            LOGO
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="/sign-up">
                <Button className="SignUpBtn" variant="outline-light" size="lg">
                  회원가입
                </Button>{" "}
              </Nav.Link>
              <Nav.Link href="/sign-in">
                <Button className="SignInBtn" variant="info" size="lg">
                  로그인
                </Button>{" "}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
