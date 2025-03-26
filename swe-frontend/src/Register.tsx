import React, { useState } from "react";
import axios from "axios";


export const Register = (props: { onFormSwitch: (formName: string) => void }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email);
        setError(null);
        setSuccess(null);
        try{
        const response = await axios.post("http://localhost:8080/users", {
            username: name,
            email,
            password: pass,
        });
        console.log(response);
        setSuccess("Successfully Registered, Proceed to Already Have an Account.");
        } catch (error) {
            console.error("Error registering", error);
            setError("Error registering, please try again.");
        }
    };

    return(
        <>
        <div className={"auth-form-container"}>
            <h1>International Fabrics</h1>
        <form className={"register-form"} onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Full Name" id="name" name="name"/>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" id="email" name="email"/>
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" id="password" name="password"/>
            <button type="submit">Register</button>
            {success && <p style={{color: 'green'}}>{success}</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </form>
        <button className="link-button" onClick={() => props.onFormSwitch('login')}>Already have an account?</button>
        </div>
        </>
    )
}