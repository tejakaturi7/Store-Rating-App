import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function StoreList() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/stores");
        setStores(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStores();
  }, []);

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}></nav>
      <div style={styles.header}>
        <h2 style={styles.title}>🏪 Store List</h2>
        <Link to="/add-store" style={styles.addButton} aria-label="Add a new store">
          Add Store
        </Link>
      </div>
      <div style={styles.storeList}>
        {stores.length === 0 ? (
          <p style={styles.noStores}>No stores available. Add one to get started!</p>
        ) : (
          <ul style={styles.storeGrid}>
            {stores.map((store) => (
              <li key={store._id} style={styles.storeCard}>
                <h3 style={styles.storeName}>{store.name}</h3>
                <p style={styles.storeDetail}>{store.location}</p>
                <p style={styles.storeDetail}>{store.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(135deg, #d3f6d1 0%, #a7d7c5 100%)",
    fontFamily: "'Inter', Arial, sans-serif",
    boxSizing: "border-box",
    overflowX: "hidden",
    paddingBottom: "2rem",
  },
  navbar: {
    width: "100%",
    padding: "1rem 1.5rem",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 10,
    display: "flex",
    justifyContent: "flex-end",
  },
  header: {
    textAlign: "center",
    padding: "2rem 1.5rem",
    maxWidth: "90%",
    marginTop: "4rem",
  },
  title: {
    fontSize: "clamp(2.5rem, 6vw, 4rem)",
    fontWeight: "800",
    background: "linear-gradient(to right, #4a6f6c, #5c8d89)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    marginBottom: "1.75rem",
    animation: "fadeInDown 0.6s ease-out",
  },
  addButton: {
    padding: "0.75rem 2rem",
    background: "linear-gradient(90deg, #74b49b, #5c8d89)",
    color: "white",
    textDecoration: "none",
    borderRadius: "0.75rem",
    fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
    fontWeight: "600",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    ":hover": {
      background: "linear-gradient(90deg, #5c8d89, #4a6f6c)",
      transform: "translateY(-2px) scale(1.05)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    },
    ":focus": {
      outline: "none",
      boxShadow: "0 0 0 4px rgba(92, 141, 137, 0.3)",
    },
  },
  storeList: {
    width: "100%",
    maxWidth: "1200px",
    padding: "0 1.5rem",
  },
  noStores: {
    fontSize: "clamp(1rem, 3vw, 1.25rem)",
    color: "#1a2e2b", // Darker text color
    textAlign: "center",
    animation: "fadeInUp 0.6s ease-out 0.3s",
    animationFillMode: "forwards",
    opacity: 0,
  },
  storeGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "1.5rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
    "@media (min-width: 640px)": {
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    },
  },
  storeCard: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    },
  },
  storeName: {
    fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
    fontWeight: "600",
    color: "#1a2e2b", // Darker text color
    marginBottom: "0.5rem",
  },
  storeDetail: {
    fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
    color: "#1a2e2b", // Darker text color
    marginBottom: "0.25rem",
    lineHeight: "1.5",
  },
};

export default StoreList;