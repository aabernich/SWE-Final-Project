import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProductPage.css";

interface Product {
  id: number;
  name: string;
  price: string;
  manufacturer: string;
  country: string;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
}

interface Review {
  rating: number;
  comment: string;
  username: string;
  userId: number;
}

const ProductPage = () => {

  const { id } = useParams<{ id: string }>();
  const [product,setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/id`, {
          params: { id },
        });
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product", error);
        setError("Product not found");
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/reviews`, {
          params: { productId: id },
        });
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  const handleAdd = async () => {
    if (!product || !selectedSize || !selectedColor) {
      setFeedback("Please select both size and color.");
      return;
    }

    try {
      const userId = localStorage.getItem("userID");
      await axios.post("http://localhost:8080/addcart", {
        userId,
        productId: product.id,
        size: selectedSize,
        color: selectedColor,
      });

      setFeedback("Added to cart!");
    } catch (err) {
      console.error("Error adding to cart", err);
      setFeedback("Failed to add to cart.");
    }
  };

  if (error || !product) return <h2>{error}</h2>;

  return (
    <div className="product-page-container">
      <Header />
      <div className="product-info-section">

        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-brand">{product.manufacturer} — {product.country}</p>
          <p className="product-price">${product.price}</p>

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
            <button className="add-to-cart" onClick={handleAdd}>Add to Cart</button>
            {feedback && <p style={{ marginTop: "10px" }}>{feedback}</p>}
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
            </ul>
          </div>
        </div>
      </div>

      <div className="product-reviews">
      <h3>Customer Reviews</h3>
        {reviews.length > 0 ? (
          <div>
            {reviews.map((review) => (
              <div key={review.userId} className="review-item">
                <h4>{review.username}</h4>
                <p>Rating: {review.rating}/5</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet. Be the first to write one!</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
