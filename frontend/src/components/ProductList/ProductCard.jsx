import React from "react";
import "./Product.css";


const ProductCard = ({ product, onClick }) => {
  const { title, tags, images } = product;

  return (
    <div
    className="product-card"
    onClick={onClick}
    style={{
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "15px",
      margin: "10px",
      cursor: "pointer",
      width: "250px",
      textAlign: "center",
      backgroundColor: "#fff",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    }}
  >
    <img
      src={images[0]}
      alt={title}
      className="product-image"
      style={{
        width: "100%",
        height: "150px",
        objectFit: "cover",
        borderRadius: "8px",
      }}
    />
    <h3
      style={{
        fontSize: "18px",
        color: "#333",
        margin: "10px 0",
      }}
    >
    Title: {title}
    </h3>
    <p
      className="tags"
      style={{
        color: "#666",
        fontSize: "14px",
        backgroundColor: "#f0f0f0",
        padding: "5px 10px",
        borderRadius: "5px",
      }}
    >
      <span style={{ fontWeight: "bold", color: "#333" }}>Tags:</span>{tags.join(", ")}
    </p>
  </div>
  );
};

export default ProductCard;
