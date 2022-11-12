import React from "react";
import ImageButton from "../../components/ImageButton/ImageButton";
import ItemListing from "../../components/ItemListing/ItemListing";
import ListingGrid from "../../components/ListingGrid/ListingGrid";

export default function Home() {
  const listings = [
    {
      image: "./skis.jpg",
      price: 5,
      ProductName: "Snowboard",
      UserName: "Granola Man",
    },
    {
      image: "./skis.jpg",
      price: 5,
      ProductName: "Snowboard",
      UserName: "Granola Man",
    },
    {
      image: "./skis.jpg",
      price: 5,
      ProductName: "Snowboard",
      UserName: "Granola Man",
    },
    {
      image: "./skis.jpg",
      price: 5,
      ProductName: "Snowboard",
      UserName: "Granola Man",
    },
    {
      image: "./skis.jpg",
      price: 5,
      ProductName: "Snowboard",
      UserName: "Granola Man",
    },
    {
      image: "./skis.jpg",
      price: 5,
      ProductName: "Snowboard",
      UserName: "Granola Man",
    },
  ];

  return (
    <>
      <h1 className="mb-2">Welcome to our website</h1>
      <div className="d-flex flex-rowcol">
        {/* <ImageButton className="m-20" to="/home" img="/logo192.png"/>
                <ImageButton className="m-20" to="/home" img="/logo192.png"/>
                <ImageButton className="m-20" to="/home" img="/logo192.png"/> */}
        <ListingGrid>
          {listings.map((x) => (
            <ItemListing listing={x} />
          ))}
        </ListingGrid>
      </div>
    </>
  );
}
