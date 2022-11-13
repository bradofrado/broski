import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import FilterButton from "../FilterButton/FilterButton";
import SearchBar from "../SearchBar/SearchBar";
import SortByDropdown from "../SortByDropdown/SortByDropdown";
import "./toolbar.css";

const filters = ["Friends", "Biking", "Camping", "Snow", "Water", "Climbing"];
const filtersName = {
    Friends: "Friends",
    Biking: "Bike",
    Camping: "Camp",
    Snow: "Snow",
    Water: "Water",
    Climbing: "Climb"
}
export default function Toolbar({onSearch, sortValue, onSortSelect, ...props}) {
    //const [filterStates, setFilterStates] = useState(filters.slice());

    const changeFilter = (name, state) => {
        const copy = props.filters.slice();
        if (state) {
            !copy.includes(name) && copy.push(name);
        } else {
            const index = copy.indexOf(name);

            index > -1 && copy.splice(index, 1);
        }
        props.onFilterChange && props.onFilterChange(copy);
    }

    return <>
    <Navbar bg="main" variant="dark" className="toolbar-container">
        <Container>
            {/* <Navbar.Brand href="/">Navbar</Navbar.Brand> */}
            <SearchBar onChange={onSearch}/>
            <Nav className="me-auto">
                {filters.map(x => <FilterButton className="mx-2" state={props.filters.includes(x)} onChange={(state) => changeFilter(x, state)}>{filtersName[x]}</FilterButton>)}
            </Nav>
            <SortByDropdown onSelect={onSortSelect} value={sortValue}/>
        </Container>
    </Navbar>
    </>
}