// src/pages/AddProduct.js
import React, { useState } from "react";
import api, { setAuthToken } from "../services/api";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("T-Shirt"); // default category
  const [gender, setGender] = useState("men"); // default gender
  const [sizes, setSizes] = useState(""); // comma-separated
  const [colors, setColors] = useState(""); // comma-separated
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  setAuthToken(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("gender", gender);
      formData.append("sizes", sizes);
      formData.append("colors", colors);
      if (image) formData.append("image", image);

      const res = await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(`✅ Product "${res.data.name}" added successfully!`);
      setName(""); setDescription(""); setPrice(""); setStock("");
      setCategory("T-Shirt"); setGender("men"); setSizes(""); setColors(""); setImage(null);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "❌ Failed to add product");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Add Clothing Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required /><br />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required /><br />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required /><br />
        <input type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} required /><br />

        {/* Dropdown for category */}
        <select value={category} onChange={e => setCategory(e.target.value)} required>
          <option value="T-Shirt">T-Shirt</option>
          <option value="Pant">Pant</option>
          <option value="Shoes">Shoes</option>
          <option value="Other">Other</option>
        </select><br />

        {/* Dropdown for gender */}
        <select value={gender} onChange={e => setGender(e.target.value)} required>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select><br />

        <input type="text" placeholder="Sizes (S,M,L)" value={sizes} onChange={e => setSizes(e.target.value)} /><br />
        <input type="text" placeholder="Colors (Red,Blue)" value={colors} onChange={e => setColors(e.target.value)} /><br />
        <input type="file" onChange={e => setImage(e.target.files[0])} /><br />
        <button 
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#7c3aed",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "10px",
            transition: "background-color 0.3s"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#6d28d9";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#7c3aed";
          }}
        >
          Add Product
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
