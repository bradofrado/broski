import React from "react";
import Button from "../../components/Inputs/Buttons";

export default function Home() {
  return (
    <>
      <h1 className="mb-2">Welcome to Broski</h1>
      <Button href="/market">Goto Marketplace</Button>
    </>
  );
}
