import React, { useState } from "react";


export const Register = (props: { onFormSwitch: (formName: string) => void }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email);
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
        </form>
        <button className="link-button" onClick={() => props.onFormSwitch('login')}>Already have an account?</button>
        </div>
        </>
    )
}