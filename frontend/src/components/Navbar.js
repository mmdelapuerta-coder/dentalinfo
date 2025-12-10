<nav
  style={{
    position: "fixed",
    top: 20,
    right: 40,
    zIndex: 1200,
    display: "flex",
    flexDirection: "row",
    gap: 30,
    padding: "14px 22px",
    background: "rgba(255,255,255,0.85)",
    borderRadius: 14,
    border: `2px solid ${GOLD}`,
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    backdropFilter: "blur(6px)",
    alignItems: "center",
  }}
>
  <NavButton label="Home" icon="⭐" active={activeNav === "home"} onClick={() => scrollToSection(homeRef, "home")} />
  <NavButton label="About" icon="📘" active={activeNav === "about"} onClick={() => scrollToSection(aboutRef, "about")} />
  <NavButton label="Services" icon="🛠️" active={activeNav === "services"} onClick={() => scrollToSection(servicesRef, "services")} />
  <NavButton label="Contact" icon="📞" active={activeNav === "contact"} onClick={() => scrollToSection(contactRef, "contact")} />

  {/* BOOK APPOINTMENT BUTTON (gold highlight) */}
  <button
    onClick={() => navigate("/book-appointment")}
    style={{
      padding: "10px 16px",
      fontWeight: 800,
      borderRadius: 12,
      border: "none",
      cursor: "pointer",
      background: `linear-gradient(135deg, ${GOLD}, #e6b800)`,
      color: "#111",
      boxShadow: "0 6px 20px rgba(255,215,0,0.3)",
    }}
  >
    📅 Book Appointment
  </button>
</nav>
