import React from "react";
import Button from "../../components/Inputs/Buttons";

export default function Home() {
  return (
    <>
      <img className="menuImage" src="Broskilogo.png"></img>
      <h1 className="mb-3">Adventure Begins Here</h1>
      <Button href="/market" class="btn btn-primary">
        Start Exploring
      </Button>
    </>
  );
}
