import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OwnerLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/owner/login", form);
      localStorage.setItem("ownerToken", res.data.token);
      alert("✅ Owner login successful!");
      navigate("/stores"); // Navigate to dashboard
    } catch (err) {
      setError(err.response?.data?.msg || "Server error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔑 Owner Login</h2>
        <p style={styles.subtitle}>Access your dashboard to manage your stores.</p>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #d3f6d1 0%, #a7d7c5 100%)",
    fontFamily: "'Inter', Arial, sans-serif",
    padding: "1rem",
  },
  card: {
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "1rem",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
    fontWeight: "700",
    marginBottom: "0.5rem",
    background: "linear-gradient(to right, #4a6f6c, #5c8d89)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  },
  subtitle: {
    fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
    color: "#4a6f6c",
    marginBottom: "1.5rem",
  },
  error: {
    color: "#5c8d89",
    marginBottom: "1rem",
    fontWeight: "500",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    borderRadius: "0.5rem",
    border: "1px solid #a7d7c5",
    backgroundColor: "#ffffff",
    color: "#4a6f6c",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
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
    padding: "0.75rem 1.5rem",
    background: "linear-gradient(90deg, #74b49b, #5c8d89)",
    color: "#fff",
    fontWeight: "600",
    border: "none",
    borderRadius: "0.75rem",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "all 0.3s ease",
  },
};

// Optional: hover effect for button
styles.button[':hover'] = {
  transform: "translateY(-2px) scale(1.02)",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
};

export default OwnerLogin;