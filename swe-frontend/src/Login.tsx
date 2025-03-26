import React, { useState } from "react";
import axios from "axios";

export const Login = (props: { onFormSwitch: (formName: string) => void }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email);
        setError(null);
        try{
        const response = await axios.post("http://localhost:8080/users/login", {
            email,
            password: pass,
        });
        console.log(response);
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
            {error && <p style={{ color: 'red'}}>{error}</p>}
            <button type="submit">Log In</button>
        </form>
        <button className="link-button" onClick={() => props.onFormSwitch('register')}>Don't have an account?</button>
        </div>
        </>
    )
}