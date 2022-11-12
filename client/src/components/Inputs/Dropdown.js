import { useState } from "react";
import { DropdownButton, Dropdown as D } from "react-bootstrap";
import "./inputs.css";

export default function Dropdown({items, onSelect, value, variant}) {
    const [curr, setCurr] = useState(typeof value === 'object' ? value : items.find(x => x.id === value));

    const select = (id) => {
        setCurr(items.find(x => x.id === id));

        onSelect(curr);
    }

    return <>
        <DropdownButton title={curr.name} variant={variant}>
            {items.map(x => <D.Item key={x.id} onClick={(e) => select(x.id)}>{x.name}</D.Item>)}
        </DropdownButton>
    </>
}