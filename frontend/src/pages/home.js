import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate("/products");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Clothing Store</h1>
        <p>Discover the latest fashion and place orders easily!</p>
        <button className="home-button" onClick={goToProducts}>
          Browse Products
        </button>
      </header>

      <section className="home-features">
        <div className="feature-card">
          <h2>Quality Clothing</h2>
          <p>Only the best fabrics and latest trends for you.</p>
        </div>
        <div className="feature-card">
          <h2>Fast Delivery</h2>
          <p>Get your orders delivered quickly and safely.</p>
        </div>
        <div className="feature-card">
          <h2>Easy Returns</h2>
          <p>Not satisfied? Return products hassle-free.</p>
        </div>
      </section>
    </div>
  );
}
