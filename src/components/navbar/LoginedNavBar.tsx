import "./NavBar.scss";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
function LoginedNavBar() {
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
              <Nav.Link href="/my-profile">
                <Button className="SignInBtn" variant="info" size="lg">
                  마이페이지
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default LoginedNavBar;
