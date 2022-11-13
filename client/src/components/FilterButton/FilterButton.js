import { useState } from "react";
import Button from "../Inputs/Buttons";

export default function FilterButton({ onChange, ...props }) {
  const state = props.state ?? false;
  //const [state, setState] = useState(props.state);

  const onClick = () => {
    onChange && onChange(!state);
  };

  const variant = state ? "filter" : "secondary";

  return (
    <Button {...props} onClick={onClick} variant={variant}>
      {props.children}
    </Button>
  );
}
