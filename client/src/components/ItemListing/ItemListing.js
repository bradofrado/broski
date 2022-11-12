import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function ItemListing(props) {
  return (
    <Card style={{ width: "18rem" }} text="black">
      <Card.Img variant="top" src={props.listing.image} />
      <Card.Body>
        <Card.Title>{props.listing.name}</Card.Title>
        <Card.Text>From: {props.listing.seller.firstname}</Card.Text>
        <Button variant="primary">Buy: ${props.listing.price.toFixed(2)}</Button>
      </Card.Body>
    </Card>
  );
}
