import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "../Inputs/Buttons";
import Form from "react-bootstrap/Form";

export default function MessageBoxModal(props) {
  const [show, setShow] = useState(props.show);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const handleOk = () => {
    setShow(false);
    props.onClose && props.onClose();
  };

  const firstname = props.listing ? props.listing.seller.firstname : "";
  const item = props.listing ? props.listing.name : "";

  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>To {firstname}:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Message</Form.Label>
            <Form.Control value={"Hi " + firstname + "! Is your " + item + " still available?"} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleOk}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
