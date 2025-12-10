import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login"); // redirect if not logged in
      return;
    }

    try {
      // Decode token payload (simple decode, not verifying signature here)
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role !== "admin") {
        navigate("/admin/login"); // redirect if not admin
      } else {
        setUser(payload); // set user info
      }
    } catch (err) {
      console.error("Invalid token:", err);
      navigate("/admin/login"); // redirect on error
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "50px" }}>
      <h1>Welcome, {user.username}!</h1>
      <p>Admin Dashboard</p>
      <button onClick={handleLogout} style={{ padding: "10px 20px", marginTop: "20px", background: "#ef4444", color: "white", border: "none", borderRadius: "5px" }}>
        Logout
      </button>
    </div>
  );
}
