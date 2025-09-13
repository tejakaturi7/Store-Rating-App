import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>🏪 Store Rating System</h1>
        <p style={styles.subtitle}>
          Discover a seamless way to rate and review your favorite stores.
        </p>

        {/* User Portal */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>User Portal</h2>
          <div style={styles.buttonContainer}>
            <Link 
              to="/login" 
              style={{ ...styles.button, background: "linear-gradient(90deg, #a7d7c5, #74b49b)" }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px) scale(1.05)";
                e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
              }}
            >
              User Login
            </Link>
            <Link 
              to="/signup" 
              style={{ ...styles.button, background: "linear-gradient(90deg, #74b49b, #5c8d89)" }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px) scale(1.05)";
                e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
              }}
            >
              User Signup
            </Link>
          </div>
        </div>

        {/* Store Owner Portal */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Store Owner Portal</h2>
          <div style={styles.buttonContainer}>
            <Link 
              to="/owner/login" 
              style={{ ...styles.button, background: "linear-gradient(90deg, #d3f6d1, #a7d7c5)" }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px) scale(1.05)";
                e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
              }}
            >
              Owner Login
            </Link>
            <Link 
              to="/owner/signup" 
              style={{ ...styles.button, background: "linear-gradient(90deg, #5c8d89, #74b49b)" }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px) scale(1.05)";
                e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
              }}
            >
              Owner Signup
            </Link>
          </div>
        </div>
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
    background: "radial-gradient(circle at top, #d3f6d1, #a7d7c5)",
    fontFamily: "'Inter', Arial, sans-serif",
    padding: "1rem",
    boxSizing: "border-box",
    transition: "all 0.5s ease",
  },
  content: {
    maxWidth: "900px",
    width: "100%",
    padding: "2rem",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "1rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
  title: {
    fontSize: "clamp(2.5rem, 6vw, 4rem)",
    fontWeight: "800",
    background: "linear-gradient(to right, #5c8d89, #74b49b)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    marginBottom: "1rem",
    transition: "all 0.3s ease",
  },
  subtitle: {
    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
    color: "#5c8d89",
    marginBottom: "3rem",
    lineHeight: "1.6",
    transition: "all 0.3s ease",
  },
  section: {
    marginBottom: "2.5rem",
    padding: "1rem",
    borderRadius: "0.5rem",
    background: "rgba(255, 255, 255, 0.05)",
    transition: "all 0.3s ease",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#5c8d89",
    marginBottom: "1rem",
    transition: "all 0.3s ease",
  },
  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
  },
  button: {
    padding: "0.75rem 2rem",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1rem",
    borderRadius: "0.75rem",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    display: "inline-block",
  },
};

export default Home;