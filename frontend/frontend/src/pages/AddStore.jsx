import { useState } from "react";
import axios from "axios";

const AddStore = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    owner: "" // StoreOwner ID must be provided
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/stores", form);
      console.log("✅ Store Added:", res.data);
      alert("Store added successfully!");
    } catch (err) {
      console.error("❌ AddStore Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error adding store");
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}></nav>
      <div style={styles.header}>
        <h2 style={styles.title}>🏪 Add New Store</h2>
      </div>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Store Name:
            <input
              name="name"
              placeholder="Enter store name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </label>
          <label style={styles.label}>
            Location:
            <input
              name="location"
              placeholder="Enter location"
              value={form.location}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </label>
          <label style={styles.label}>
            Owner ID:
            <input
              name="owner"
              placeholder="Enter owner ID"
              value={form.owner}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </label>
          <button type="submit" style={styles.submitButton}>
            Add Store
          </button>
        </form>
      </div>
    </div>
  );
};

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
  formContainer: {
    width: "100%",
    maxWidth: "600px",
    padding: "0 1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
    color: "#1a2e2b", // Darker text color
    fontWeight: "500",
  },
  input: {
    padding: "0.625rem 0.875rem",
    fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)",
    width: "100%",
    borderRadius: "0.5rem",
    border: "1px solid #a7d7c5",
    backgroundColor: "#ffffff",
    color: "#1a2e2b", // Darker text color
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    ":focus": {
      outline: "none",
      borderColor: "#74b49b",
      boxShadow: "0 0 0 3px rgba(116, 180, 155, 0.2)",
    },
    "::placeholder": {
      color: "#5c8d89",
    },
  },
  submitButton: {
    padding: "0.625rem 1.5rem",
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
};

export default AddStore;