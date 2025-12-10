// src/components/Sidebar.jsx
import { useState } from "react";

export default function Sidebar({ setPage }) {
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  const menuItems = ["Dashboard", "Users", "Appointments"];

  return (
    <div style={{
      width: open ? "200px" : "60px",
      height: "100vh",
      background: "#1f2937",
      color: "white",
      transition: "width 0.3s",
      padding: "10px"
    }}>
      <button onClick={() => setOpen(!open)} style={{
        background: "none",
        border: "none",
        color: "white",
        fontSize: "20px",
        cursor: "pointer",
        marginBottom: "20px"
      }}>
        ☰
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {menuItems.map((item, index) => (
          <li key={index} style={{ margin: "15px 0" }}>
            <button
              onClick={() => setPage(item)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                textAlign: "left",
                width: "100%"
              }}
            >
              {open ? item : item[0]}
            </button>
          </li>
        ))}

        <li style={{ marginTop: "30px" }}>
          <button onClick={handleLogout} style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}>
            {open ? "Logout" : "⎋"}
          </button>
        </li>
      </ul>
    </div>
  );
}
