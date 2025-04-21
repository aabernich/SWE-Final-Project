import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/payment.css";
import axios from "axios";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userID");

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
  };

  const updatePurchases = async () => {
    const response = await axios.get("http://localhost:8080/cart", {
        params: { userId },
      });

    const cartItems = response.data;
    for (let item of cartItems) {
    await axios.post("http://localhost:8080/purchases", {
        userId,
        productId: item.product_id,
    });
  }
}

  const emptyCart = async () => {
    if (!userId) {
      setErrorMessage("User is not logged in.");
      return;
    }
  
    try {
      await axios.delete(`http://localhost:8080/cart/empty`, {
        params: { userId }
      });
      console.log("Cart emptied successfully!");
    } catch (error) {
      console.error("Error emptying cart:", error);
      setErrorMessage("Failed to empty cart. Please try again later.");
    }
  };

  const handleExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpirationDate(e.target.value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(e.target.value);
  };

  const handlePaymentSubmit = async () => {
    if (!cardNumber || !expirationDate || !cvv) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      setTimeout(() => {
        setSuccessMessage("Payment successful!");
        setErrorMessage(null);
        emptyCart();
        updatePurchases();
      }, 1000);
    } catch (error) {
      setErrorMessage("Payment failed. Please try again.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="payment-container">
      <h1>Payment Details</h1>
      <form onSubmit={(e) => e.preventDefault()} className="payment-form">
        <div className="form-field">
          <label htmlFor="card-number">Card Number</label>
          <input
            type="text"
            id="card-number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="Enter your card number"
          />
        </div>
        <div className="form-field">
          <label htmlFor="expiration-date">Expiration Date</label>
          <input
            type="text"
            id="expiration-date"
            value={expirationDate}
            onChange={handleExpirationDateChange}
            placeholder="MM/YY"
          />
        </div>
        <div className="form-field">
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={handleCvvChange}
            placeholder="Enter CVV"
          />
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <button type="button" onClick={handlePaymentSubmit} className="payment-button">
          Submit Payment
        </button>
        <button type="button" onClick={() => navigate("/")} className="payment-button" style={{ backgroundColor: "blue", color: "white" }}>
            Continue Shopping
        </button>
      </form>
    </div>
  );
};

export default Payment;
