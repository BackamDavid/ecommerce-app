import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../services/api";

export default function ProductDetail({ selectedProducts, setSelectedProducts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const serverURL = "http://127.0.0.1:5000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to view product details");
      navigate("/login");
      return;
    }
    setAuthToken(token);

    const fetchProduct = async () => {
      try {
        const res = await api.get("/products");
        const products = res.data || [];
        const foundProduct = products.find(p => p._id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        if (err.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          alert("Your session has expired. Please log in again.");
          navigate("/login");
          return;
        }
        setError(err.response?.data?.error || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!selectedProducts.includes(product._id)) {
      setSelectedProducts(prev => [...prev, product._id]);
      alert("✅ Product added to cart!");
    } else {
      setSelectedProducts(prev => prev.filter(x => x !== product._id));
      alert("Product removed from cart");
    }
  };

  const isSelected = selectedProducts.includes(product?._id);

  if (loading) {
    return (
      <div style={{ 
        padding: "40px", 
        textAlign: "center",
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ fontSize: "18px" }}>Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ 
        padding: "40px", 
        textAlign: "center",
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px"
      }}>
        <div style={{ fontSize: "18px", color: "#d32f2f" }}>{error || "Product not found"}</div>
        <button
          onClick={() => navigate("/products")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#7c3aed",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div style={{
      padding: "40px 20px",
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "var(--bg-color)",
      color: "var(--text-color)",
      minHeight: "80vh"
    }}>
      {/* Back Button */}
      <button
        onClick={() => navigate("/products")}
        style={{
          marginBottom: "30px",
          padding: "8px 16px",
          backgroundColor: "transparent",
          color: "var(--text-color)",
          border: "1px solid var(--border-color)",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "var(--hover-bg)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "transparent";
        }}
      >
        ← Back to Products
      </button>

      {/* Product Catalog */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        backgroundColor: "var(--bg-color)",
        borderRadius: "12px",
        padding: "30px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        {/* Left Side - Product Image */}
        <div>
          <img
            src={product.image ? `${serverURL}${product.image}` : `${serverURL}/api/products/uploads/placeholder.png`}
            alt={product.name}
            style={{
              width: "100%",
              height: "500px",
              objectFit: "cover",
              borderRadius: "12px",
              border: "1px solid var(--border-color)"
            }}
          />
        </div>

        {/* Right Side - Product Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <h1 style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "var(--text-color)"
            }}>
              {product.name}
            </h1>
            <div style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#7c3aed",
              marginBottom: "20px"
            }}>
              ${product.price}
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "10px",
              color: "var(--text-color)"
            }}>
              Description
            </h2>
            <p style={{
              fontSize: "16px",
              lineHeight: "1.6",
              color: "var(--text-color)",
              opacity: 0.9
            }}>
              {product.description || "No description available"}
            </p>
          </div>

          {/* Category */}
          {product.category && (
            <div>
              <h2 style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "10px",
                color: "var(--text-color)"
              }}>
                Category
              </h2>
              <span style={{
                display: "inline-block",
                padding: "6px 12px",
                backgroundColor: "#7c3aed",
                color: "white",
                borderRadius: "20px",
                fontSize: "14px"
              }}>
                {product.category}
              </span>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h2 style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "10px",
                color: "var(--text-color)"
              }}>
                Available Sizes
              </h2>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {product.sizes.map((size, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "8px 16px",
                      border: "1px solid var(--border-color)",
                      borderRadius: "6px",
                      fontSize: "14px",
                      backgroundColor: "var(--hover-bg)"
                    }}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h2 style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "10px",
                color: "var(--text-color)"
              }}>
                Available Colors
              </h2>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "8px 16px",
                      border: "1px solid var(--border-color)",
                      borderRadius: "6px",
                      fontSize: "14px",
                      backgroundColor: "var(--hover-bg)"
                    }}
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stock */}
          <div>
            <h2 style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "10px",
              color: "var(--text-color)"
            }}>
              Stock Availability
            </h2>
            <span style={{
              padding: "6px 12px",
              backgroundColor: product.stock > 0 ? "#10b981" : "#ef4444",
              color: "white",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "500"
            }}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
            </span>
          </div>

          {/* Product ID */}
          <div style={{
            padding: "15px",
            backgroundColor: "var(--hover-bg)",
            borderRadius: "8px",
            fontSize: "12px",
            color: "var(--text-color)",
            opacity: 0.7
          }}>
            <strong>Product ID:</strong> {product._id}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            style={{
              padding: "14px 24px",
              backgroundColor: isSelected ? "#d32f2f" : "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              transition: "all 0.2s",
              width: "100%"
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = 0.9;
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = 1;
            }}
          >
            {isSelected ? "✓ Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

