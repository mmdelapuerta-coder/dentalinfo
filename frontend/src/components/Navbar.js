// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Book Appointment", path: "/book-appointment" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "#ddb532ff",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Clinic Name */}
      <div style={{ fontWeight: "700", fontSize: "1.5rem" }}>
        Amethyst Dental Clinic
      </div>

      {/* Desktop Menu */}
      <ul
        className="desktop-menu"
        style={{
          display: "flex",
          gap: "1.5rem",
          listStyle: "none",
          margin: 0,
        }}
      >
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              style={{ color: "white", fontWeight: "600", textDecoration: "none" }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger */}
      <div
        className="mobile-menu-button"
        style={{
          display: "none",
          flexDirection: "column",
          cursor: "pointer",
        }}
        onClick={() => setOpen(!open)}
      >
        <span style={{ width: "25px", height: "3px", backgroundColor: "white", margin: "4px 0" }} />
        <span style={{ width: "25px", height: "3px", backgroundColor: "white", margin: "4px 0" }} />
        <span style={{ width: "25px", height: "3px", backgroundColor: "white", margin: "4px 0" }} />
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul
          style={{
            position: "absolute",
            top: "70px",
            right: "2rem",
            backgroundColor: "#ddb532ff",
            padding: "1rem 2rem",
            listStyle: "none",
            borderRadius: "8px",
          }}
        >
          {menuItems.map((item) => (
            <li key={item.name} style={{ padding: "0.5rem 0" }}>
              <Link
                to={item.path}
                style={{ color: "white", fontWeight: "600", textDecoration: "none" }}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
