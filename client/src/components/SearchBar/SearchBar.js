import Input from "../Inputs/Input";
import './searchbar.css';

export default function SearchBar(props) {
    return <>
        <Input onChange={props.onChange}>
            <img className="search-icon" src="/searchIcon.png"/>
        </Input>
    </>
}