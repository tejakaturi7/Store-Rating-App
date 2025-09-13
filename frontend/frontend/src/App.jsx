import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import StoreList from "./pages/StoreList";
import AddStore from "./pages/AddStore";
import UserHome from "./pages/UserHome";
import OwnerSignup from "./pages/OwnerSignup";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerDashboard from "./pages/OwnerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Routes */}
        <Route path="/stores" element={<StoreList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-store" element={<AddStore />} />
        <Route path="/userhome" element={<UserHome />} />

        {/* Owner Routes */}
        <Route path="/owner/signup" element={<OwnerSignup />} />
        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />

        {/* Catch-All Fallback */}
        <Route path="*" element={<h1 style={{ textAlign: "center", marginTop: "2rem" }}>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
