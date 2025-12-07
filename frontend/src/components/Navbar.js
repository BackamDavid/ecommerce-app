import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ token, role, setToken, setRole, darkMode, setDarkMode, searchQuery, setSearchQuery, genderFilter, setGenderFilter }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Apply dark mode to document body and root CSS variables with purple theme
    if (darkMode) {
      document.body.style.backgroundColor = "#1e1b4b";
      document.body.style.color = "#e9d5ff";
      document.documentElement.style.setProperty("--bg-color", "#1e1b4b");
      document.documentElement.style.setProperty("--text-color", "#e9d5ff");
      document.documentElement.style.setProperty("--border-color", "#6366f1");
      document.documentElement.style.setProperty("--hover-bg", "#312e81");
    } else {
      document.body.style.backgroundColor = "#f3e8ff";
      document.body.style.color = "#4c1d95";
      document.documentElement.style.setProperty("--bg-color", "#f3e8ff");
      document.documentElement.style.setProperty("--text-color", "#4c1d95");
      document.documentElement.style.setProperty("--border-color", "#c084fc");
      document.documentElement.style.setProperty("--hover-bg", "#e9d5ff");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null); // removes token in App state
    setRole(null);  // removes role in App state
    setMenuOpen(false); // Close menu after logout
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  // Handle search input change and navigate to products page
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Navigate to products page if not already there and user has typed something
    if (query.trim() && location.pathname !== "/products") {
      navigate("/products");
    }
  };

  // Handle search on Enter key
  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate("/products");
      e.target.blur(); // Remove focus from input
    }
  };

  // Home icon SVG
  const HomeIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <path
        d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
        stroke={darkMode ? "#e9d5ff" : "#6d28d9"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 22V12H15V22"
        stroke={darkMode ? "#e9d5ff" : "#6d28d9"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const navStyle = {
    padding: "10px 20px",
    borderBottom: darkMode ? "1px solid #6366f1" : "1px solid #c084fc",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: darkMode ? "#1e1b4b" : "#f3e8ff",
    color: darkMode ? "#e9d5ff" : "#4c1d95",
    transition: "background-color 0.3s, color 0.3s",
  };

  // Search icon SVG
  const SearchIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
        stroke={darkMode ? "#e9d5ff" : "#6d28d9"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <nav style={navStyle}>
      {/* Left side: Company name */}
      <div>
        <h1 style={{ 
          margin: 0, 
          fontSize: "24px", 
          fontWeight: "bold",
          color: darkMode ? "#e9d5ff" : "#6d28d9"
        }}>
          Fit Smart
        </h1>
      </div>

      {/* Center: Search Bar and Gender Filter */}
      <div style={{ 
        flex: 1, 
        maxWidth: "600px", 
        margin: "0 20px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: darkMode ? "#312e81" : "#ffffff",
          borderRadius: "25px",
          border: darkMode ? "1px solid #6366f1" : "1px solid #c084fc",
          padding: "8px 15px",
          transition: "all 0.3s"
        }}>
          <button
            type="button"
            onClick={() => {
              if (searchQuery.trim()) {
                navigate("/products");
              }
            }}
            style={{
              background: "none",
              border: "none",
              cursor: searchQuery.trim() ? "pointer" : "default",
              padding: "0",
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => {
              if (searchQuery.trim()) {
                e.target.style.transform = "scale(1.1)";
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
            aria-label="Search products"
          >
            <SearchIcon />
          </button>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              color: darkMode ? "#e9d5ff" : "#4c1d95",
              fontSize: "14px",
            }}
            onFocus={(e) => {
              e.target.parentElement.style.borderColor = darkMode ? "#9333ea" : "#7c3aed";
              e.target.parentElement.style.boxShadow = "0 0 0 2px rgba(124, 58, 237, 0.2)";
            }}
            onBlur={(e) => {
              e.target.parentElement.style.borderColor = darkMode ? "#6366f1" : "#c084fc";
              e.target.parentElement.style.boxShadow = "none";
            }}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                // If on products page, stay there; otherwise navigate to products
                if (location.pathname !== "/products") {
                  navigate("/products");
                }
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: darkMode ? "#e9d5ff" : "#6d28d9",
                padding: "0 5px",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => {
                e.target.style.color = darkMode ? "#ffffff" : "#7c3aed";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = darkMode ? "#e9d5ff" : "#6d28d9";
              }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Gender Filter Buttons */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px"
        }}>
          <button
            onClick={() => setGenderFilter("all")}
            style={{
              padding: "6px 16px",
              backgroundColor: genderFilter === "all" ? "#7c3aed" : "transparent",
              color: genderFilter === "all" ? "white" : (darkMode ? "#e9d5ff" : "#6d28d9"),
              border: darkMode ? "1px solid #6366f1" : "1px solid #c084fc",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: genderFilter === "all" ? "600" : "400",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              if (genderFilter !== "all") {
                e.target.style.backgroundColor = darkMode ? "#312e81" : "#e9d5ff";
              }
            }}
            onMouseLeave={(e) => {
              if (genderFilter !== "all") {
                e.target.style.backgroundColor = "transparent";
              }
            }}
          >
            All
          </button>
          <button
            onClick={() => setGenderFilter("men")}
            style={{
              padding: "6px 16px",
              backgroundColor: genderFilter === "men" ? "#7c3aed" : "transparent",
              color: genderFilter === "men" ? "white" : (darkMode ? "#e9d5ff" : "#6d28d9"),
              border: darkMode ? "1px solid #6366f1" : "1px solid #c084fc",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: genderFilter === "men" ? "600" : "400",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              if (genderFilter !== "men") {
                e.target.style.backgroundColor = darkMode ? "#312e81" : "#e9d5ff";
              }
            }}
            onMouseLeave={(e) => {
              if (genderFilter !== "men") {
                e.target.style.backgroundColor = "transparent";
              }
            }}
          >
            Men
          </button>
          <button
            onClick={() => setGenderFilter("women")}
            style={{
              padding: "6px 16px",
              backgroundColor: genderFilter === "women" ? "#7c3aed" : "transparent",
              color: genderFilter === "women" ? "white" : (darkMode ? "#e9d5ff" : "#6d28d9"),
              border: darkMode ? "1px solid #6366f1" : "1px solid #c084fc",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: genderFilter === "women" ? "600" : "400",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              if (genderFilter !== "women") {
                e.target.style.backgroundColor = darkMode ? "#312e81" : "#e9d5ff";
              }
            }}
            onMouseLeave={(e) => {
              if (genderFilter !== "women") {
                e.target.style.backgroundColor = "transparent";
              }
            }}
          >
            Women
          </button>
        </div>
      </div>

      {/* Right side: Home button, Dark mode toggle, and Hamburger menu */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {/* Home Button */}
        <Link 
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "5px",
            borderRadius: "4px",
            transition: "background-color 0.2s",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = darkMode ? "#312e81" : "#e9d5ff")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <HomeIcon />
        </Link>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          style={{
            background: "none",
            border: darkMode ? "1px solid #6366f1" : "1px solid #c084fc",
            borderRadius: "20px",
            padding: "5px 10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: darkMode ? "#e9d5ff" : "#6d28d9",
            transition: "all 0.3s",
          }}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <>
              <span>🌙</span>
              <span style={{ fontSize: "12px" }}>Dark</span>
            </>
          ) : (
            <>
              <span>☀️</span>
              <span style={{ fontSize: "12px" }}>Light</span>
            </>
          )}
        </button>

        {/* Hamburger Menu Button */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Toggle menu"
          >
            <div
              style={{
                width: "25px",
                height: "3px",
                backgroundColor: darkMode ? "#e9d5ff" : "#6d28d9",
                transition: "all 0.3s",
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
            />
            <div
              style={{
                width: "25px",
                height: "3px",
                backgroundColor: darkMode ? "#e9d5ff" : "#6d28d9",
                transition: "all 0.3s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <div
              style={{
                width: "25px",
                height: "3px",
                backgroundColor: darkMode ? "#e9d5ff" : "#6d28d9",
                transition: "all 0.3s",
                transform: menuOpen ? "rotate(-45deg) translate(7px, -6px)" : "none",
              }}
            />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                backgroundColor: darkMode ? "#312e81" : "#f3e8ff",
                border: darkMode ? "1px solid #6366f1" : "1px solid #c084fc",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                minWidth: "200px",
                zIndex: 1000,
                marginTop: "10px",
                padding: "10px 0",
              }}
              onMouseLeave={closeMenu}
            >
              {/* Products - Main Link */}
              <Link
                to="/products"
                onClick={closeMenu}
                style={{
                  display: "block",
                  padding: "12px 20px",
                  textDecoration: "none",
                  color: darkMode ? "#e9d5ff" : "#6d28d9",
                  borderBottom: darkMode ? "1px solid #6366f1" : "1px solid #c084fc",
                  transition: "background-color 0.2s",
                  fontWeight: "600"
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = darkMode ? "#312e81" : "#e9d5ff")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
              >
                All Products
              </Link>
              
              {/* Category Links */}
              <Link
                to="/products/t-shirt"
                onClick={closeMenu}
                style={{
                  display: "block",
                  padding: "10px 20px 10px 35px",
                  textDecoration: "none",
                  color: darkMode ? "#e9d5ff" : "#6d28d9",
                  borderBottom: darkMode ? "1px solid #6366f1" : "1px solid #c084fc",
                  transition: "background-color 0.2s",
                  fontSize: "14px"
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = darkMode ? "#312e81" : "#e9d5ff")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
              >
                T-Shirts
              </Link>
              <Link
                to="/products/shirt"
                onClick={closeMenu}
                style={{
                  display: "block",
                  padding: "10px 20px 10px 35px",
                  textDecoration: "none",
                  color: darkMode ? "#e9d5ff" : "#6d28d9",
                  borderBottom: darkMode ? "1px solid #6366f1" : "1px solid #c084fc",
                  transition: "background-color 0.2s",
                  fontSize: "14px"
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = darkMode ? "#312e81" : "#e9d5ff")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
              >
                Shirts
              </Link>
              <Link
                to="/products/pant"
                onClick={closeMenu}
                style={{
                  display: "block",
                  padding: "10px 20px 10px 35px",
                  textDecoration: "none",
                  color: darkMode ? "#e9d5ff" : "#6d28d9",
                  borderBottom: darkMode ? "1px solid #6366f1" : "1px solid #c084fc",
                  transition: "background-color 0.2s",
                  fontSize: "14px"
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = darkMode ? "#312e81" : "#e9d5ff")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
              >
                Pants
              </Link>
              <Link
                to="/products/shoes"
                onClick={closeMenu}
                style={{
                  display: "block",
                  padding: "10px 20px 10px 35px",
                  textDecoration: "none",
                  color: darkMode ? "#e9d5ff" : "#6d28d9",
                  borderBottom: darkMode ? "1px solid #6366f1" : "1px solid #c084fc",
                  transition: "background-color 0.2s",
                  fontSize: "14px"
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = darkMode ? "#312e81" : "#e9d5ff")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
              >
                Shoes
              </Link>

              {/* My Orders (only if logged in) */}
              {token && (
                <Link
                  to="/orders"
                  onClick={closeMenu}
                  style={{
                    display: "block",
                    padding: "12px 20px",
                    textDecoration: "none",
                    color: darkMode ? "#ffffff" : "#333",
                    borderBottom: darkMode ? "1px solid #444" : "1px solid #eee",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = darkMode ? "#333" : "#f5f5f5")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                >
                  My Orders
                </Link>
              )}

              {/* Add Product (Admin only) */}
              {token && role === "admin" && (
                <Link
                  to="/add-product"
                  onClick={closeMenu}
                  style={{
                    display: "block",
                    padding: "12px 20px",
                    textDecoration: "none",
                    color: darkMode ? "#ffffff" : "#333",
                    borderBottom: darkMode ? "1px solid #444" : "1px solid #eee",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = darkMode ? "#333" : "#f5f5f5")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                >
                  Add Product
                </Link>
              )}

              {/* Login/Logout */}
              {token ? (
                <button
                  onClick={handleLogout}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "12px 20px",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    borderTop: darkMode ? "1px solid #6366f1" : "1px solid #c084fc",
                    color: "#d32f2f",
                    cursor: "pointer",
                    fontSize: "16px",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = darkMode ? "#4c1d95" : "#fce7f3")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    style={{
                      display: "block",
                      padding: "12px 20px",
                      textDecoration: "none",
                      color: darkMode ? "#ffffff" : "#333",
                      borderTop: darkMode ? "1px solid #6366f1" : "1px solid #c084fc",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = darkMode ? "#333" : "#f5f5f5")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    style={{
                      display: "block",
                      padding: "12px 20px",
                      textDecoration: "none",
                      color: darkMode ? "#ffffff" : "#333",
                      borderTop: darkMode ? "1px solid #6366f1" : "1px solid #c084fc",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = darkMode ? "#333" : "#f5f5f5")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
