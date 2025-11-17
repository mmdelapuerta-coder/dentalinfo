import React, { useState, useEffect } from "react";
import BookingForm from "../components/BookingForm";

const Home = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const services = [
    {
      name: "Consultation",
      description: "Initial check-up and personalized treatment planning.",
      icon: "🦷",
    },
    {
      name: "Oral Prophylaxis",
      description: "Professional cleaning to prevent gum disease.",
      icon: "🧼",
    },
    {
      name: "Orthodontics",
      description: "Braces and aligners for straighter teeth.",
      icon: "🦷",
    },
    {
      name: "Dentures",
      description: "Custom dentures for a natural smile.",
      icon: "👄",
    },
    {
      name: "Teeth Whitening",
      description: "Brighten your smile safely.",
      icon: "✨",
    },
    {
      name: "Extraction",
      description: "Painless tooth removal when necessary.",
      icon: "🦷",
    },
    {
      name: "Crowns and Bridges",
      description: "Restorative solutions for damaged teeth.",
      icon: "🏗️",
    },
    {
      name: "Root Canal Treatment",
      description: "Save infected teeth with advanced care.",
      icon: "🔧",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
        lineHeight: 1.6,
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        paddingBottom: "4rem",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: "#fff",
          color: "#222",
          padding: "4rem 1rem 3rem",
          textAlign: "center",
          animation: loaded ? "fadeIn 1s ease-in-out" : "none",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            fontWeight: "900",
            letterSpacing: "2px",
            color: "#D4AF37",
            animation: loaded ? "typing 3s steps(40, end), blink-caret 0.75s step-end infinite" : "none",
            borderRight: "2px solid #D4AF37",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "fit-content",
            margin: "0 auto 1rem",
          }}
        >
          We Create Healthy Smiles For Your Entire Family
        </h1>
        <p
          style={{
            fontSize: "1.3rem",
            maxWidth: "600px",
            margin: "0 auto 2rem",
            color: "#555",
            animation: loaded ? "fadeIn 1.5s ease-in-out 1s both" : "none",
          }}
        >
          Quality dental care with comfort, precision, and compassion.
        </p>
        <button
          style={{
            fontSize: "1.1rem",
            backgroundColor: "#D4AF37",
            color: "white",
            padding: "0.75rem 2.2rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "700",
            boxShadow: "0 5px 12px rgba(212, 175, 55, 0.6)",
            transition: "all 0.3s ease",
            animation: loaded ? "pulse 2s infinite" : "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#B8860B";
            e.currentTarget.style.transform = "scale(1.1) rotate(3deg)";
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(212, 175, 55, 1), 0 0 30px rgba(212, 175, 55, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#D4AF37";
            e.currentTarget.style.transform = "scale(1) rotate(0deg)";
            e.currentTarget.style.boxShadow = "0 5px 12px rgba(212, 175, 55, 0.6)";
          }}
          onClick={() => setShowBooking(true)}
        >
          Book an Appointment
        </button>
      </section>

      {/* About Us */}
      <section
        style={{
          padding: "3rem 1rem",
          maxWidth: "900px",
          margin: "3rem auto",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(212, 175, 55, 0.15)",
          animation: loaded ? "slideInLeft 1s ease-out 0.5s both" : "none",
        }}
      >
        <h2
          style={{
            color: "#D4AF37",
            marginBottom: "1rem",
            fontWeight: "700",
            fontSize: "2rem",
            textAlign: "center",
          }}
        >
          About Us
        </h2>
        <p style={{ fontSize: "1.15rem", color: "#222", lineHeight: 1.7, textAlign: "center" }}>
          At Smile Dental Clinic, we specialize in creating beautiful, confident smiles. Our expert dentists provide advanced treatments using modern technology — ensuring comfort, precision, and care for every patient.
        </p>
      </section>

      {/* Services */}
      <section
        style={{
          maxWidth: "960px",
          margin: "3rem auto 6rem",
          padding: "0 1rem",
          animation: loaded ? "fadeIn 1s ease-out 1s both" : "none",
        }}
      >
        <h2
          style={{
            color: "#D4AF37",
            marginBottom: "2.5rem",
            textAlign: "center",
            fontWeight: "700",
            fontSize: "2.2rem",
          }}
        >
          Our Services
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.8rem",
          }}
        >
          {services.map((service, index) => (
            <div
              key={service.name}
              style={{
                backgroundColor: "white",
                borderRadius: "15px",
                boxShadow: "0 6px 18px rgba(212, 175, 55, 0.2)",
                padding: "1.8rem 1.5rem",
                fontWeight: "600",
                fontSize: "1.1rem",
                color: "#333",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                animation: loaded ? `staggerFadeIn 0.6s ease-out ${1.2 + index * 0.15}s both` : "none",
                transform: "translateY(30px) scale(0.9)",
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-15px) rotate(5deg) scale(1.08)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(212, 175, 55, 0.6), 0 0 25px rgba(212, 175, 55, 0.4)";
                e.currentTarget.style.backgroundColor = "#fefefe";
                e.currentTarget.style.border = "2px solid #D4AF37";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) rotate(0deg) scale(1)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(212, 175, 55, 0.2)";
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.border = "none";
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "0.5rem",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.3) rotate(15deg) translateY(-5px)";
                  e.currentTarget.style.filter = "drop-shadow(0 0 10px rgba(212, 175, 55, 0.8))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1) rotate(0deg) translateY(0)";
                  e.currentTarget.style.filter = "none";
                }}
              >
                {service.icon}
              </div>
              <h3 style={{ margin: "0.5rem 0", color: "#D4AF37" }}>
                {service.name}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#555" }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      {showBooking && (
        <section
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(5px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "1rem",
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "2rem",
              maxWidth: "600px",
              width: "100%",
              boxShadow: "0 15px 50px rgba(212, 175, 55, 0.7)",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
              animation: "slideInUp 0.5s ease-out",
            }}
          >
            <button
              onClick={() => setShowBooking(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "20px",
                fontSize: "1.8rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#D4AF37",
                fontWeight: "700",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.3) rotate(90deg)";
                e.currentTarget.style.color = "#B8860B";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                e.currentTarget.style.color = "#D4AF37";
              }}
              aria-label="Close booking form"
            >
              &times;
            </button>
            <BookingForm />
          </div>
        </section>
      )}

      {/* Inline CSS for Custom Animations */}
      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideInLeft { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
          @keyframes slideInUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          @keyframes staggerFadeIn { from { opacity: 0; transform: translateY(30px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
          @keyframes typing { from { width: 0; } to { width: 100%; } }
          @keyframes blink-caret { from, to { border-color: transparent; } 50% { border-color: #D4AF37; } }
          @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        `}
      </style>
    </div>
  );
};

export default Home;