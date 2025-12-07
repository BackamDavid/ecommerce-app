import React, { useEffect, useState } from "react";
import api, { setAuthToken } from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in to view orders");
    setAuthToken(token);

    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        console.log("Fetched orders response:", res);
        console.log("Orders data:", res.data);
        console.log("Number of orders:", res.data?.length || 0);
        setOrders(res.data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);
        const errorMsg = err.response?.data?.error || err.message || "Unknown error";
        alert(`Error fetching orders: ${errorMsg}. Please check console for details.`);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>
      {orders.length > 0 ? (
        orders.map((o) => (
          <div
            key={o._id}
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          >
            <strong>Order ID:</strong> {o._id} <br />
            {o.warning && <p style={{ color: "orange" }}>{o.warning}</p>}
            <strong>Products:</strong>
            <ul>
              {Array.isArray(o.products) && o.products.length ? (
                o.products.map((p) => (
                  <li key={p.id}>
                    {p.name} - ${p.price}
                  </li>
                ))
              ) : (
                <li>No products found</li>
              )}
            </ul>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
