import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Review = () => {
  const { productId } = useParams<{ productId: string }>();
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const submitReview = async () => {
    if (rating === 0) {
      setErrorMessage("Please select a rating.");
      return;
    }
    if (!comment.trim()) {
      setErrorMessage("Review cannot be empty.");
      return;
    }

    try {
      const userId = localStorage.getItem("userID");
      if (!userId) {
        setErrorMessage("You must be logged in to leave a review.");
        return;
      }

      await axios.post("http://localhost:8080/reviews", {
        productId: Number(productId),
        userId,
        rating,
        comment,
      });

      setSuccessMessage("Review submitted successfully!"); 
    } catch (error) {
      console.error("Failed to submit review:", error);
      setErrorMessage("Failed to submit review. Please try again later.");
    }
  };

  return (
    <div className="review-container">
      <h1>Leave a Review for Product</h1>

      {/* Rating Section (1-5 stars) */}
      <div className="rating">
        <span>Rating:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? "filled" : ""}`}
            onClick={() => handleRatingChange(star)}
            style={{ cursor: "pointer", fontSize: "20px", color: star <= rating ? "gold" : "gray" }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Review Text Area */}
      <textarea
        value={comment}
        onChange={handleReviewChange}
        rows={6}
        placeholder="Write your review here..."
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <button onClick={submitReview} style={{ marginTop: "10px" }}>
        Submit Review
      </button>
      <button onClick={() => navigate("/cart")} style={{ marginTop: "10px", marginLeft: "10px" }}>
        Back to Cart
      </button>
    </div>
  );
};

export default Review;
