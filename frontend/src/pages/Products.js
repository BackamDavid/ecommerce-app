import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { setAuthToken } from "../services/api";
import ProductCard from "../components/ProductCard";

// -------------------- Products Page --------------------
export default function Products({ selectedProducts, setSelectedProducts, searchQuery, genderFilter }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in to view products");
    setAuthToken(token);

    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        console.log("Fetched products:", res.data);
        setProducts(res.data || []);
      } catch (err) {
        console.error("Error fetching products:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          // Token expired or invalid
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
  }, []);

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

  // -------------------- placeOrder function --------------------
const placeOrder = async () => {
  console.log("Selected products array:", selectedProducts); // ✅ Check if IDs are correct
  console.log("Product IDs types:", selectedProducts.map(id => ({ id, type: typeof id }))); // ✅ Debug types
  const token = localStorage.getItem("token");
  console.log("JWT Token:", token); // ✅ Check token

  if (!selectedProducts.length) return alert("Select products first!");
  if (!token) return alert("Please log in first!");

  // Ensure all product IDs are strings
  const productIdsAsStrings = selectedProducts.map(id => String(id));

  try {
    const res = await api.post(
      "/orders",
      { product_ids: productIdsAsStrings }, // ✅ Ensure array of strings
      { 
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // ✅ Send JWT token
        }
      }
    );
    console.log("Order response:", res.data);
    alert("✅ Order placed successfully!");
    setSelectedProducts([]);
  } catch (err) {
    console.error("Place order error:", err);
    console.error("Error response:", err.response?.data);
    console.error("Error status:", err.response?.status);
    const errorMessage = err.response?.data?.error || err.message || "⚠️ Order could not be processed. Make sure products are valid.";
    alert(`Error ${err.response?.status || 'Unknown'}: ${errorMessage}`);
  }
};


  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>All Products</h2>
      
      {/* Category Navigation */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        marginBottom: "30px",
        flexWrap: "wrap"
      }}>
        <Link
          to="/products/t-shirt"
          style={{
            padding: "10px 20px",
            backgroundColor: "#7c3aed",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            fontSize: "14px",
            transition: "background-color 0.3s"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#6d28d9"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#7c3aed"}
        >
          T-Shirts
        </Link>
        <Link
          to="/products/shirt"
          style={{
            padding: "10px 20px",
            backgroundColor: "#7c3aed",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            fontSize: "14px",
            transition: "background-color 0.3s"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#6d28d9"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#7c3aed"}
        >
          Shirts
        </Link>
        <Link
          to="/products/pant"
          style={{
            padding: "10px 20px",
            backgroundColor: "#7c3aed",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            fontSize: "14px",
            transition: "background-color 0.3s"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#6d28d9"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#7c3aed"}
        >
          Pants
        </Link>
        <Link
          to="/products/shoes"
          style={{
            padding: "10px 20px",
            backgroundColor: "#7c3aed",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            fontSize: "14px",
            transition: "background-color 0.3s"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#6d28d9"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#7c3aed"}
        >
          Shoes
        </Link>
      </div>

      {products.length === 0 && <p style={{ textAlign: "center" }}>No products available</p>}
      
      {filteredProducts.length === 0 && products.length > 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No products found {searchQuery && `matching "${searchQuery}"`}
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

      {products.length > 0 && (
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
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
