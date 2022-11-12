import { Container, Nav, Navbar } from "react-bootstrap";
import SearchBar from "../SearchBar/SearchBar";
import "./toolbar.css";

export default function Toolbar({onSearch}) {
    return <>
    <Navbar bg="main" variant="dark" className="toolbar-container">
        <Container>
            {/* <Navbar.Brand href="/">Navbar</Navbar.Brand> */}
            <SearchBar onChange={onSearch}/>
            <Nav className="me-auto">
                <Nav.Link href="/market">FILTER BUTTON</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
    </>
}