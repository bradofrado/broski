import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Icon from "./components/Icon/Icon";

export default function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img className="navImage" src="Broskilogo.png"></img>
            Broski
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/market">Marketplace</Nav.Link>
          </Nav>
          <Nav>
            {/* <Nav.Link href="/profile"><Icon icon="profile"/></Nav.Link> */}
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
