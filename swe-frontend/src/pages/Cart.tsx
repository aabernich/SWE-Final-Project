import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Styles/Cart.css";

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  size: string;
  color: string;
  name: string;
  price: string;
  image: string;
}

interface PastPurchase {
    name: string;
    manufacturer: string;
    id: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [pastPurchases, setPastPurchases] = useState<PastPurchase[]>([]);
  const userId = localStorage.getItem("userID");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:8080/cart", {
          params: { userId },
        });
        setCartItems(response.data);
      } catch (err) {
        console.error("Error fetching cart items:", err);
      }
    };

    const fetchPastPurchases = async () => {
        try {
          const response = await axios.get("http://localhost:8080/purchases", {
            params: { userId },
          });
          setPastPurchases(response.data);
        } catch (err) {
          console.error("Error fetching past purchases:", err);
        }
      };

    fetchCart();
    fetchPastPurchases();
  }, [userId]);

  const updateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      await axios.put("http://localhost:8080/cart/quantity", {
        id,
        quantity: newQuantity,
      });
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const removeItem = async (id: number) => {
    try {
      await axios.delete("http://localhost:8080/cart", {
        data: { Id: id },
      });
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + tax + shipping;

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>${parseFloat(item.price).toFixed(2)}</p>
                  <p>Size: {item.size}</p>
                  <p>Color: {item.color}</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-total">
                  ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                </div>
                <button onClick={() => removeItem(item.id)} className="remove-item">×</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-button">Proceed to Checkout</button>
            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </>
      )}

        <div className="past-purchases">
        <h2>Past Purchases</h2>
        {pastPurchases.length === 0 ? (
          <p>You haven't purchased anything yet.</p>
        ) : (
          <ul>
            {pastPurchases.map((purchase, index) => (
              <li key={index}>
                <strong>{purchase.name  + ' '}</strong> by {purchase.manufacturer + ', '}
                <Link to={`/review/${purchase.id}`}>
                Leave a Review
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
