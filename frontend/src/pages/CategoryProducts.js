import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../services/api";
import ProductCard from "../components/ProductCard";

export default function CategoryProducts({ category, selectedProducts, setSelectedProducts, searchQuery, genderFilter }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to view products");
      navigate("/login");
      return;
    }
    setAuthToken(token);

    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        console.log("Fetched products:", res.data);
        // Filter products by category
        const categoryProducts = (res.data || []).filter(
          p => p.category && p.category.toLowerCase() === category.toLowerCase()
        );
        setProducts(categoryProducts);
      } catch (err) {
        console.error("Error fetching products:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          alert("Your session has expired. Please log in again.");
          window.location.href = "/login";
          return;
        }
        alert(err.response?.data?.error || "Failed to fetch products. Please try again.");
      }
    };

    fetchProducts();
  }, [category, navigate]);

  // Filter products based on search query and gender filter
  useEffect(() => {
    let filtered = products;
    
    // Apply gender filter
    if (genderFilter && genderFilter !== "all") {
      filtered = filtered.filter(product => product.gender === genderFilter);
    }
    
    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name?.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, genderFilter, products]);

  const toggleSelect = (id) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const placeOrder = async () => {
    const token = localStorage.getItem("token");
    if (!selectedProducts.length) return alert("Select products first!");
    if (!token) return alert("Please log in first!");

    const productIdsAsStrings = selectedProducts.map(id => String(id));

    try {
      const res = await api.post(
        "/orders",
        { product_ids: productIdsAsStrings },
        { 
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );
      console.log("Order response:", res.data);
      alert("✅ Order placed successfully!");
      setSelectedProducts([]);
    } catch (err) {
      console.error("Place order error:", err);
      const errorMessage = err.response?.data?.error || err.message || "⚠️ Order could not be processed.";
      alert(`Error ${err.response?.status || 'Unknown'}: ${errorMessage}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        {category} Collection
      </h2>

      {products.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          No {category} products available
        </p>
      )}
      
      {filteredProducts.length === 0 && products.length > 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No {category} products found {searchQuery && `matching "${searchQuery}"`}
          {genderFilter !== "all" && ` for ${genderFilter}`}
        </p>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px",
        justifyItems: "center"
      }}>
        {filteredProducts.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            onSelect={toggleSelect}
            selected={selectedProducts.includes(product._id)}
          />
        ))}
      </div>

      {products.length > 0 && selectedProducts.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            onClick={placeOrder}
            style={{
              padding: "12px 25px",
              backgroundColor: "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "background-color 0.3s"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#6d28d9";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#7c3aed";
            }}
          >
            Place Order ({selectedProducts.length} item{selectedProducts.length > 1 ? 's' : ''})
          </button>
        </div>
      )}
    </div>
  );
}

