import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function ItemListing(props) {
  return (
    <Card text="black" style={{ width: "251px" }} className="mt-2" border="white">
      <a className="blackLinks" href="">
        <Card.Img
          variant="top"
          src={props.listing.image}
          style={{ width: "250px", height: "250px", borderRadius: "12px" }}
        />
      </a>
      <Card.Body>
        <a className="blackLinks" href="">
          <Card.Title style={{ margin: "3px" }} href="">
            {props.listing.name}
          </Card.Title>
        </a>
        <Card.Text style={{ margin: "3px" }}>
          <em>
            {props.listing.seller.firstname} - {props.listing.location.city}, {props.listing.location.state}
          </em>
        </Card.Text>
        <strong style={{ margin: "0px", padding: "0px" }}>${props.listing.price.toFixed(2)} / day</strong>
        {/* <Button variant="primary">Buy: ${props.listing.price.toFixed(2)}</Button> */}
      </Card.Body>
      {/* <ul class="list-group list-group-flush">
        <li class="list-group-item">${props.listing.price.toFixed(2)} / day</li>
      </ul> */}
    </Card>
  );
}
