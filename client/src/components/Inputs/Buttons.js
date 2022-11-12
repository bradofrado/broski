import {Button as B, Spinner}from 'react-bootstrap';
import "./inputs.css";

export default function Button({children, spinner, ...props}) {
    return <>
        <B {...props}>
            {spinner && <><Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span></>}
            {!spinner && children}
        </B>
    </>
}