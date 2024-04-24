import {Button as B, Spinner}from 'react-bootstrap';
import "./inputs.css";

export default function Button({children, spinner, ...props}) {
    if (props.href) {
        return <a /** background-color:#EAB061FF;
 */ className="button" href={props.href} {...props}>{children}</a>
    }
    return <>
        <B /** background-color:#838D95FF;
 */ {...props}>
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