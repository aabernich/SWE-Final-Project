import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Import your components/pages
import HomePage from './pages/HomePage';
import ProductPage from "./pages/ProductPage";
import {Register} from './pages/Register';
import { Login } from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes for different pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register onFormSwitch={function (formName: string): void {
            throw new Error('Function not implemented.');
          } } />} />
          <Route path="/login" element={<Login onFormSwitch={function (formName: string): void {
            throw new Error('Function not implemented.');
          } } />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
