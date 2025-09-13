import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/auth/signup", form);
      alert("✅ User registered successfully!");
      setForm({ name: "", email: "", address: "", password: "" });
      navigate("/login"); // <-- redirect to login page after signup
    } catch (err) {
      setError(err.response?.data?.msg || "Server error");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>✨ Signup</h2>
      <p style={styles.subtitle}>
        Create an account to start rating and reviewing stores.
      </p>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Signup
        </button>
      </form>
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
    justifyContent: "center",
    padding: "1.5rem",
    background: "linear-gradient(135deg, #d3f6d1 0%, #a7d7c5 100%)",
    fontFamily: "'Inter', Arial, sans-serif",
    boxSizing: "border-box",
    overflow: "hidden",
    transition: "background 0.5s ease",
  },
  title: {
    fontSize: "clamp(2.5rem, 6vw, 4rem)",
    fontWeight: "800",
    background: "linear-gradient(to right, #4a6f6c, #5c8d89)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    marginBottom: "1.75rem",
    textAlign: "center",
    animation: "fadeInDown 0.6s ease-out",
  },
  subtitle: {
    fontSize: "clamp(1.125rem, 3vw, 1.5rem)",
    color: "#4a6f6c",
    marginBottom: "1.5rem",
    textAlign: "center",
    maxWidth: "90%",
    lineHeight: "1.6",
    animation: "fadeInUp 0.6s ease-out 0.2s",
    animationFillMode: "forwards",
    opacity: 0,
  },
  error: {
    fontSize: "clamp(0.875rem, 2.5vw, 1rem)",
    color: "#5c8d89",
    marginBottom: "1rem",
    textAlign: "center",
    maxWidth: "90%",
    animation: "fadeInUp 0.6s ease-out 0.3s",
    animationFillMode: "forwards",
    opacity: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.25rem",
    width: "100%",
    maxWidth: "400px",
  },
  input: {
    padding: "0.875rem 1rem",
    fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
    width: "100%",
    maxWidth: "350px",
    borderRadius: "0.5rem",
    border: "1px solid #a7d7c5",
    backgroundColor: "#ffffff",
    color: "#4a6f6c",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
  button: {
    padding: "0.875rem 2.5rem",
    background: "linear-gradient(90deg, #74b49b, #5c8d89)",
    color: "white",
    textDecoration: "none",
    borderRadius: "0.75rem",
    fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
    fontWeight: "600",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
    width: "100%",
    maxWidth: "250px",
    textAlign: "center",
    cursor: "pointer",
    border: "none",
    ":hover": {
      background: "linear-gradient(90deg, #5c8d89, #4a6f6c)",
      transform: "translateY(-2px) scale(1.05)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
    ":focus": {
      outline: "none",
      boxShadow: "0 0 0 4px rgba(92, 141, 137, 0.3)",
    },
  },
};

export default Signup;