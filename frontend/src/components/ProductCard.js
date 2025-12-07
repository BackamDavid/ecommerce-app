import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, onSelect, selected }) {
  const serverURL = "http://127.0.0.1:5000";
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Don't navigate if clicking the button
    if (e.target.tagName !== "BUTTON" && !e.target.closest("button")) {
      navigate(`/products/${product._id}`);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      style={{
        position: "relative",
        border: "1px solid #ddd",
        borderRadius: "10px",
        width: "220px",
        boxShadow: selected ? "0 0 15px #7c3aed" : "0 0 5px #ccc",
        cursor: "pointer",
        backgroundColor: "#fff",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 5px 15px rgba(124, 58, 237, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = selected ? "0 0 15px #7c3aed" : "0 0 5px #ccc";
      }}
    >
      <img
        src={product.image ? `${serverURL}${product.image}` : `${serverURL}/api/products/uploads/placeholder.png`}
        alt={product.name}
        style={{ width: "100%", height: "250px", objectFit: "cover" }}
      />
      <div style={{ padding: "10px" }}>
        <h3>{product.name}</h3>
        <p style={{ minHeight: "40px" }}>{product.description}</p>
        {product.category && <p><b>Category:</b> {product.category}</p>}
        {product.sizes?.length > 0 && <p><b>Sizes:</b> {product.sizes.join(", ")}</p>}
        {product.colors?.length > 0 && <p><b>Colors:</b> {product.colors.join(", ")}</p>}
        <p style={{ fontWeight: "bold" }}>${product.price}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect(product._id);
        }}
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          padding: "8px",
          backgroundColor: selected ? "#7c3aed" : "#a855f7",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "background-color 0.3s",
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = selected ? "#6d28d9" : "#9333ea";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = selected ? "#7c3aed" : "#a855f7";
        }}
      >
        {selected ? "Selected" : "Add to Cart"}
      </button>
    </div>
  );
}
