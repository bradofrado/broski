import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "../Inputs/Buttons";

export default function MessageBoxModal({props}) {
    const [show, setShow] = useState(props.show);

    useEffect(() => {
        setShow(props.show)
    }, [props.show]);

    const handleOk = () => {
        setShow(false);
        props.onClose && props.onClose();
    }

    return <>
        <Modal show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleOk}>
                Ok
            </Button>
            </Modal.Footer>
        </Modal>
    </>
}