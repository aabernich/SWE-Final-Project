import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const Login = (props: { onFormSwitch: (formName: string) => void }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();
        

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email);
        setError(null);
        setSuccess(null);
        try{
        const response = await axios.post("http://localhost:8080/users/login", {
            email,
            password: pass,
        });
        console.log(response);
        setSuccess("Successful Login Test Message");
        } catch (error) {
            console.error("Error Logging In, Recheck Credentials.", error);
            setError("Invalid email or password. Recheck Credentials.");
        }
    };

    return(
        <>
        <div className={"auth-form-container"}>
            <h1>International Fabrics</h1>
        <form className={"login-form"} onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" id="email" name="email"/>
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" id="password" name="password"/>
            <button type="submit">Log In</button>
        </form>
        {error && <div style={{ color: 'red'}}>{error}</div>}
        {success && <div style={{color: 'green'}}>{success}</div>}
        <button className="link-button" onClick={() => navigate('/register')}>Don't have an account?</button>
        <button className="link-button" onClick={() => navigate('/')}>Back to Home page</button>
        </div>
        </>
    )
}