import React, { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Login } from "./Login"
import { Register } from "./Register"

function App() {
  //const [count, setCount] = useState(0)
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName: React.SetStateAction<string>) => {
    setCurrentForm(formName);
  }

  return (
    <>
      <div>
        {
          currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
        }
      </div>
    </>
  )
}

export default App
//continue at 15:00 mark