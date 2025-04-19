import React, { useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import sampleClothes from "../data/mockClothes";
import "../styles/ProductPage.css";

const ProductPage = () => {

  const { id } = useParams<{ id: string }>();
  const product = sampleClothes.find(item => item.id === parseInt(id || "", 10));

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="product-page-container">
      <Header />
      <div className="product-info-section">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-brand">{product.manufacturer} — {product.country}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>

          {/* Size selection */}
          <div className="product-options">
            <label htmlFor="size-select">Select Size:</label>
            <select
              id="size-select"
              value={selectedSize}
              onChange={e => setSelectedSize(e.target.value)}
            >
              <option value="">-- Choose Size --</option>
              {product.sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Color selection */}
          <div className="product-options">
            <label htmlFor="color-select">Select Color:</label>
            <select
              id="color-select"
              value={selectedColor}
              onChange={e => setSelectedColor(e.target.value)}
            >
              <option value="">-- Choose Color --</option>
              {product.colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          <div className="product-buttons">
            <button className="add-to-cart">Add to Cart</button>
            <button className="add-to-wishlist">♡ Wishlist</button>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-specs">
            <h3>Product Details</h3>
            <ul>
              <li>Material: 100% Cotton</li>
              <li>Care: Machine wash cold</li>
              <li>Available sizes: S, M, L, XL</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="product-reviews">
        <h3>Customer Reviews</h3>
        <p>No reviews yet. Be the first to write one!</p>
      </div>
    </div>
  );
};

export default ProductPage;
