import axios from "axios";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Inputs/Buttons";
import Input from "../../components/Inputs/Input";
import PasswordValidation from "../../components/PasswordValidator/PasswordValidator";

export default function Signup() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    const validator = useRef(null);

    const onSignup = async () => {
        if (validator.current.isValid() && firstname && lastname && email && username) {
            try {
                const response = await axios.post('/api/users', {firstname, lastname, email, username, password});
                window.location = "/";
            } catch (ex) {
    
            }
        }
    }

    const isEmpty = (s) => {
        return s.length === 0 || /\s/.test(s);
    }

    return <>
        {/* <div className="App-header"> */}
            <h1>Sign Up</h1>
            <form className="login-container">
                <Input placeholder="First Name" value={firstname} onChange={(val) => setFirstName(val)}/>
                <Input placeholder="Last Name" value={lastname} onChange={(val) => setLastName(val)} />
                <Input placeholder="Email" value={email} onChange={(val) => setEmail(val)} />
                <Input placeholder="Username" value={username} onChange={(val) => setUsername(val)} />
                <Input placeholder="Password" type="password" value={password} onChange={(val) => setPassword(val) } />
                <Input placeholder="Retype Password" type="password"value={repassword} onChange={(val) => setRepassword(val) } />
                <PasswordValidation ref={validator} show={!isEmpty(password + repassword)} password={password} repassword={repassword}/>
                <Button onClick={onSignup}>Signup</Button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        {/* </div> */}
    </>
}