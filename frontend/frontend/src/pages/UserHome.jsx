  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";

  function UserHome() {
    const [stores, setStores] = useState([]);
    const [comments, setComments] = useState({});
    const [ratings, setRatings] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // Fetch all stores with reviews
    useEffect(() => {
      const fetchStores = async () => {
        try {
          const res = await axios.get("http://localhost:5001/api/stores", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setStores(res.data);
        } catch (err) {
          console.error("❌ Error fetching stores:", err.response?.data || err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchStores();
    }, [token]);

    // Handle comment input
    const handleCommentChange = (storeId, value) => {
      setComments({ ...comments, [storeId]: value });
      setErrors({ ...errors, [storeId]: "" });
    };

    // Handle rating input
    const handleRatingChange = (storeId, value) => {
      setRatings({ ...ratings, [storeId]: value });
      setErrors({ ...errors, [storeId]: "" });
    };

    // Submit review
    const handleSubmitReview = async (storeId) => {
      if (!comments[storeId] || !ratings[storeId]) {
        setErrors({
          ...errors,
          [storeId]: "⚠️ Please provide both comment and rating",
        });
        return;
      }

      try {
        const res = await axios.post(
          `http://localhost:5001/api/stores/${storeId}/reviews`,
          {
            comment: comments[storeId],
            rating: ratings[storeId],
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Update store reviews instantly
        setStores((prevStores) =>
          prevStores.map((store) =>
            store._id === storeId ? { ...store, reviews: res.data.reviews } : store
          )
        );

        // Clear inputs
        setComments({ ...comments, [storeId]: "" });
        setRatings({ ...ratings, [storeId]: "" });
        setErrors({ ...errors, [storeId]: "" });

        alert("✅ Review submitted successfully!");
      } catch (err) {
        setErrors({
          ...errors,
          [storeId]: err.response?.data?.message || "❌ Server error",
        });
      }
    };

    // Logout
    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };

    return (
      <div style={styles.container}>
        {/* Navbar */}
        <nav style={styles.navbar}>
          <button onClick={handleLogout} style={styles.logoutButton}>
            🚪 Logout
          </button>
        </nav>

        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>🏠 User Home - Rate Stores</h2>
        </div>

        {/* Store list */}
        <div style={styles.storeList}>
          {loading ? (
            <p style={styles.noStores}>Loading stores...</p>
          ) : stores.length === 0 ? (
            <p style={styles.noStores}>No stores available to rate.</p>
          ) : (
            <div style={styles.storeGrid}>
              {stores.map((store) => (
                <div key={store._id} style={styles.storeCard}>
                  <h3 style={styles.storeName}>{store.name}</h3>
                  <p style={styles.storeDetail}>📍 {store.location}</p>
                  <p style={styles.storeDetail}>{store.category}</p>

                  <h4 style={styles.reviewHeader}>💬 Reviews:</h4>
                  {store.reviews && store.reviews.length > 0 ? (
                    <ul style={styles.reviewList}>
                      {store.reviews.map((review, idx) => (
                        <li key={idx} style={styles.review}>
                          <strong style={styles.reviewAuthor}>
                            {review.user?.username ||
                              review.user?.email ||
                              "Anonymous"}
                          </strong>{" "}
                          : {review.comment} -{" "}
                          <em style={styles.reviewRating}>{review.rating} ⭐</em>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={styles.noReviews}>No reviews yet</p>
                  )}

                  {/* Review form */}
                  <div style={styles.reviewForm}>
                    <label style={styles.label}>
                      ✍️ Comment:
                      <input
                        type="text"
                        value={comments[store._id] || ""}
                        onChange={(e) =>
                          handleCommentChange(store._id, e.target.value)
                        }
                        style={styles.input}
                        placeholder="Write your review..."
                      />
                    </label>

                    <label style={styles.label}>
                      ⭐ Rating:
                      <select
                        value={ratings[store._id] || ""}
                        onChange={(e) =>
                          handleRatingChange(store._id, e.target.value)
                        }
                        style={styles.select}
                      >
                        <option value="">Select</option>
                        {[1, 2, 3, 4, 5].map((val) => (
                          <option key={val} value={val}>
                            {val} ⭐
                          </option>
                        ))}
                      </select>
                    </label>

                    {/* Error message */}
                    {errors[store._id] && (
                      <p style={{ ...styles.noReviews, color: "#d32f2f" }}>
                        {errors[store._id]}
                      </p>
                    )}

                    <button
                      onClick={() => handleSubmitReview(store._id)}
                      style={styles.submitButton}
                      aria-label={`Submit review for ${store.name}`}
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Inline styles
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
      padding: "1rem 1rem",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: 0,
      zIndex: 10,
      display: "flex",
      justifyContent: "flex-end",
    },
    logoutButton: {
      padding: "0.5rem 1rem",
      backgroundColor: "#d32f2f",
      color: "#fff",
      border: "none",
      borderRadius: "0.5rem",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },
    header: {
      textAlign: "center",
      padding: "1.5rem 1rem",
      maxWidth: "90%",
      marginTop: "3rem",
    },
    title: {
      fontSize: "clamp(2rem, 6vw, 3.5rem)",
      fontWeight: "800",
      background: "linear-gradient(to right, #4a6f6c, #5c8d89)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      marginBottom: "1.5rem",
    },
    storeList: {
      width: "100%",
      maxWidth: "1200px",
      padding: "0 0.5rem",
    },
    noStores: {
      fontSize: "clamp(1rem, 3vw, 1.25rem)",
      color: "#4a6f6c",
      textAlign: "center",
    },
    storeGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: "1.5rem",
    },
    storeCard: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: "0.75rem",
      padding: "1rem",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    storeName: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#4a6f6c",
      marginBottom: "0.5rem",
    },
    storeDetail: {
      fontSize: "1rem",
      color: "#4a6f6c",
      marginBottom: "0.25rem",
    },
    reviewHeader: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#4a6f6c",
      marginTop: "1rem",
      marginBottom: "0.5rem",
    },
    reviewList: {
      listStyle: "none",
      padding: 0,
      margin: "0 0 1rem 0",
    },
    review: {
      borderBottom: "1px solid #a7d7c5",
      padding: "0.5rem 0",
    },
    reviewAuthor: {
      color: "#4a6f6c",
      fontWeight: "500",
    },
    reviewRating: {
      color: "#5c8d89",
    },
    noReviews: {
      fontSize: "1rem",
      color: "#5c8d89",
      marginBottom: "1rem",
    },
    reviewForm: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      marginTop: "1rem",
    },
    label: {
      display: "flex",
      flexDirection: "column",
      fontSize: "1rem",
      color: "#4a6f6c",
    },
    input: {
      padding: "0.625rem 0.875rem",
      fontSize: "1rem",
      width: "100%",
      borderRadius: "0.5rem",
      border: "1px solid #a7d7c5",
      backgroundColor: "#ffffff",
      color: "#4a6f6c",
    },
    select: {
      padding: "0.625rem 0.875rem",
      fontSize: "1rem",
      width: "100%",
      borderRadius: "0.5rem",
      border: "1px solid #a7d7c5",
      backgroundColor: "#ffffff",
      color: "#4a6f6c",
    },
    submitButton: {
      padding: "0.625rem 1.5rem",
      background: "linear-gradient(90deg, #74b49b, #5c8d89)",
      color: "white",
      border: "none",
      borderRadius: "0.75rem",
      fontSize: "1rem",
      fontWeight: "600",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
      cursor: "pointer",
    },
  };

  export default UserHome;
