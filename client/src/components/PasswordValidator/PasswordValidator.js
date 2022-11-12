import React, { forwardRef, useImperativeHandle } from "react";
import "./password-validator.css";

const defaultValidations = [
    {
        label: "Password must be 8 characters long",
        test(password, retype) {
            return password.length >= 8;
        }
    },
    {
        label: "Password must contain a special character",
        test(password, retype) {
            return password.replaceAll(/[@|%]/g, "").length < password.length;
        }
    },
    {
        label: "The two passwords must match",
        test(password, retype) {
            return password === retype;
        }
    }
]

const PasswordValidation = forwardRef(function({show, validations, password, repassword}, ref) {
    let flag = true;
    validations = validations ?? defaultValidations;

    const comp = validations.reduce((prev, curr) => {
        const success = curr.test(password, repassword);
        if (!success) flag = false;

        prev.push(<ValidationLineItem label={curr.label} success={success}/>)

        return prev;
    }, []);

    useImperativeHandle(ref, () => ({
        isValid() {
            return flag;
        }
    }))

    if (show) {
        return <div className="validate-container">{comp}</div>;
    } else {
        return <></>
    }
});

const ValidationLineItem = function({label, success}) {
    //const success = test(password, repassword);
    const className = success ? "validate-success" : "validate-fail";
    return <><p className={className + ' validate-text'}>{label}</p></>
}

export default PasswordValidation;