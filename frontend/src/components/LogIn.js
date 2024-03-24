import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, []);

    const handleLogin = async () => {
        let result = await fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        result = await result.json();
        console.log(result);
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/");
        } else {
            alert("Enter correct details");
        }
    }

    return (
        <div className="login">
            <input onChange={(e) => setEmail(e.target.value)} value={email} className="inputBox" type="text" placeholder="Enter Email" />
            <input onChange={(e) => setPassword(e.target.value)} value={password} className="inputBox" type="password" placeholder="Enter Password" />
            <button onClick={handleLogin} className="appButton" type="button">Log In</button>
        </div>
    )
}

export default LogIn;
