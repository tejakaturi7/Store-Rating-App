import { useState, useEffect } from "react";
import axios from "axios";

function OwnerDashboard() {
  const [owner, setOwner] = useState(null);
  const [stores, setStores] = useState([]);
  const token = localStorage.getItem("ownerToken"); // Owner JWT token

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        // Fetch owner profile
        const resOwner = await axios.get("http://localhost:5001/api/auth/owner/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOwner(resOwner.data.owner);

        // Fetch all stores created by this owner
        const resStores = await axios.get("http://localhost:5001/api/stores/owner", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStores(resStores.data.stores);
      } catch (err) {
        console.error(err);
        alert("Error fetching data. Please login again.");
      }
    };

    fetchOwnerData();
  }, [token]);

  if (!owner) return <p>Loading dashboard...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>👋 Welcome, {owner.name}</h2>
      <h3>Profile Details</h3>
      <ul>
        <li><strong>Email:</strong> {owner.email}</li>
        <li><strong>Address:</strong> {owner.address}</li>
        <li><strong>Role:</strong> {owner.role}</li>
      </ul>

      <h3>Your Stores</h3>
      {stores.length === 0 ? (
        <p>You have not added any stores yet.</p>
      ) : (
        <ul>
          {stores.map((store) => (
            <li key={store._id} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
              <h4>{store.name}</h4>
              <p><strong>Location:</strong> {store.location}</p>
              <p><strong>Description:</strong> {store.description || "N/A"}</p>
              <p><strong>Ratings:</strong> {store.ratings?.length || 0}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OwnerDashboard;
