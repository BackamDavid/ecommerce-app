import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import TShirt from "./pages/TShirt";
import Shirt from "./pages/Shirt";
import Pant from "./pages/Pant";
import Shoes from "./pages/Shoes";
import Orders from "./pages/Orders";
import AddProduct from "./pages/AddProduct";
import { setAuthToken } from "./services/api";
import { STRIPE_PUBLIC_KEY, hasValidStripeKey } from "./config/stripe";

// Initialize Stripe only if we have a valid key
export const stripePromise = hasValidStripeKey ? loadStripe(STRIPE_PUBLIC_KEY) : null;

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // State to track selected products for orders
  const [selectedProducts, setSelectedProducts] = useState([]);
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  // State for gender filter
  const [genderFilter, setGenderFilter] = useState("all"); // "all", "men", or "women"

  useEffect(() => {
    if (token) setAuthToken(token);
  }, [token]);

  // Stripe Elements options
  const options = {
    mode: 'payment',
    currency: 'usd',
    // Add any additional options here
  };

  return (
    <>
      {hasValidStripeKey && stripePromise ? (
        <Elements stripe={stripePromise} options={options}>
          <div style={{
            backgroundColor: darkMode ? "#1e1b4b" : "#f3e8ff",
            color: darkMode ? "#e9d5ff" : "#4c1d95",
            minHeight: "100vh",
            transition: "background-color 0.3s, color 0.3s",
          }}>
            <Navbar 
              token={token} 
              role={role} 
              setToken={setToken} 
              setRole={setRole}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              genderFilter={genderFilter}
              setGenderFilter={setGenderFilter}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
              <Route
                path="/products"
                element={
                  <Products
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    searchQuery={searchQuery}
                    genderFilter={genderFilter}
                  />
                }
              />
              <Route
                path="/products/t-shirt"
                element={
                  <TShirt
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    searchQuery={searchQuery}
                    genderFilter={genderFilter}
                  />
                }
              />
              <Route
                path="/products/shirt"
                element={
                  <Shirt
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    searchQuery={searchQuery}
                    genderFilter={genderFilter}
                  />
                }
              />
              <Route
                path="/products/pant"
                element={
                  <Pant
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    searchQuery={searchQuery}
                    genderFilter={genderFilter}
                  />
                }
              />
              <Route
                path="/products/shoes"
                element={
                  <Shoes
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    searchQuery={searchQuery}
                    genderFilter={genderFilter}
                  />
                }
              />
              <Route
                path="/products/:id"
                element={
                  <ProductDetail
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                  />
                }
              />
              <Route path="/orders" element={<Orders />} />
              <Route path="/add-product" element={<AddProduct />} />
            </Routes>
          </div>
        </Elements>
      ) : (
        <div style={{
          backgroundColor: darkMode ? "#1e1b4b" : "#f3e8ff",
          color: darkMode ? "#e9d5ff" : "#4c1d95",
          minHeight: "100vh",
          transition: "background-color 0.3s, color 0.3s",
        }}>
          <Navbar 
            token={token} 
            role={role} 
            setToken={setToken} 
            setRole={setRole}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            genderFilter={genderFilter}
            setGenderFilter={setGenderFilter}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
            <Route
              path="/products"
              element={
                <Products
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                  searchQuery={searchQuery}
                  genderFilter={genderFilter}
                />
              }
            />
            <Route
              path="/products/t-shirt"
              element={
                <TShirt
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                  searchQuery={searchQuery}
                  genderFilter={genderFilter}
                />
              }
            />
            <Route
              path="/products/shirt"
              element={
                <Shirt
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                  searchQuery={searchQuery}
                  genderFilter={genderFilter}
                />
              }
            />
            <Route
              path="/products/pant"
              element={
                <Pant
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                  searchQuery={searchQuery}
                  genderFilter={genderFilter}
                />
              }
            />
            <Route
              path="/products/shoes"
              element={
                <Shoes
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                  searchQuery={searchQuery}
                  genderFilter={genderFilter}
                />
              }
            />
            <Route
              path="/products/:id"
              element={
                <ProductDetail
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                />
              }
            />
            <Route path="/orders" element={<Orders />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
