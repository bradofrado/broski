import React, { useState } from 'react';
import Input from '../../components/Inputs/Input';
import axios from 'axios';
import Button from '../../components/Inputs/Buttons';
import { Link } from 'react-router-dom';
import './login.css';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', {username, password});
            window.location = "/";
        } catch(ex) {
            if (ex.response.data.message) {
                setError(ex.response.data.message);
            }
            setLoading(false);
        }
    }

    return <>
            <h1>Login</h1>
            <form className="login-container" onSubmit={onLogin}>
                <Input value={username} placeholder="Username" onChange={(val) => setUsername(val)}/>
                <Input type="password" value={password} placeholder="Password" onChange={(val) => setPassword(val)}/>
                {error && <p className="error-text">{error}</p>}
                <Button type="submit" spinner={loading}>Login</Button>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </form>
        </>
}