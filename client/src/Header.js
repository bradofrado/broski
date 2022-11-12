import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Icon from "./components/Icon/Icon";

export default function Header() {
  return (
    <>
      <Navbar className="px-2" bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img className="navImage" src="Broskilogo.png"></img>
          Broski
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="/market">Marketplace</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/market">Community</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/market">About</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Link href="/login">
            <Icon icon="profile" />
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}
