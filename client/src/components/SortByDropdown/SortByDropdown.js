import { useState } from "react";
import Button from "../Inputs/Buttons.js";
import Dropdown from "../Inputs/Dropdown.js";

const sortItems = [
  { id: 0, name: "Price Asc", value: "price-asc" },
  { id: 1, name: "Price Desc", value: "price-desc" },
  //{id: 1, name: "Snow", value: 'snow'}
];

export default function SortByDropdown({ value, ...props }) {
  //const [value, setValue] = useState(null);
  const found = sortItems.find((x) => x.value === value);
  const id = found ? found.id : null;

  const onSelect = (val) => {
    const found = sortItems.find((x) => x.id === val);
    props.onSelect(found.value);
  };

  const variant = id !== null ? "filter" : "secondary";

  return (
    <>
      <Dropdown items={sortItems} value={id} onSelect={onSelect} variant={variant}>
        Sort By
      </Dropdown>
      {id !== null && (
        <Button className="ms-1" variant="secondary" onClick={() => props.onSelect(null)}>
          X
        </Button>
      )}
    </>
  );
}
