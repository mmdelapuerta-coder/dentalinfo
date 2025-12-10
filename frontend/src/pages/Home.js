import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#FFD700";
const CREAM = "#FFF8E1";
const WHITE = "#FFFFFF";

export default function Home() {
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState("home");
  const [aboutVisible, setAboutVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);

  const services = [
    {
      name: "Consultation",
      description: "Initial check-up and personalized treatment planning.",
      image: "https://www.citydental.com.au/wp-content/uploads/2022/08/your-teeth-dentist-sydney-cbd.jpg",
    },
    {
      name: "Oral Prophylaxis",
      description: "Professional cleaning to prevent gum disease.",
  
      image: "https://affinitydentalclinics.com/wp-content/uploads/Oral-Prophylaxis_converted.webp",
    },
    {
      name: "Orthodontics",
      description: "Braces and aligners for straighter teeth.",
     
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqcp6a08ZyogXfqkipXLrmBh1nWYj8l7fbFw&s",
    },
    {
      name: "Dentures",
      description: "Custom dentures for a natural smile.",
     
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GnY7-xtflQVVuIh-Lag4rkeqS18VkxA2jg&s",
    },
    {
      name: "Teeth Whitening",
      description: "Brighten your smile safely.",
  
      image: "https://byfordsmiles.com.au/wp-content/uploads/2021/08/What-Is-Teeth-Whitening-Everything-You-Need-To-Know.jpg",
    },
    {
      name: "Extraction",
      description: "Painless tooth removal when necessary.",
     
      image: "https://glossdentaltx.com/wp-content/uploads/2021/07/Tooth-Extraction-1024x768.jpg",
    },
    {
      name: "Crowns & Bridges",
      description: "Restorative solutions for damaged teeth.",
   
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQE33JoBV89eZ85321qNGF4GQCxLzbJJ7JDQ&s",
    },
    {
      name: "Root Canal",
      description: "Save infected teeth with advanced care.",
   


      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0eQSWdCBKioFtwds7Ad2TCCBodwlqkOY9XA&s",
    },
  ];

  // Reveal animation observers
  useEffect(() => {
    const options = { threshold: 0.16 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target === aboutRef.current) setAboutVisible(true);
        if (entry.target === servicesRef.current) setServicesVisible(true);
        if (entry.target === contactRef.current) setContactVisible(true);
      });
    }, options);

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => observer.disconnect();
  }, []);

  // Active navigation highlight
  useEffect(() => {
    const onScroll = () => {
      const sections = [
        { ref: homeRef, id: "home" },
        { ref: aboutRef, id: "about" },
        { ref: servicesRef, id: "services" },
        { ref: contactRef, id: "contact" },
      ];
      const pos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].ref.current;
        if (el && el.offsetTop <= pos) {
          setActiveNav(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (ref, id) => {
    if (ref && ref.current) {
      window.scrollTo({ top: ref.current.offsetTop - 80, behavior: "smooth" });
      if (id) setActiveNav(id);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', sans-serif",
        background: CREAM,
        color: "#222",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Global Styles */}
      <style>{`
        .top-nav-btn {
          padding: 10px 16px;
          border-radius: 8px;
          border: 2px solid ${GOLD};
          background: white;
          color: #222;
          font-weight: 800;
          letter-spacing: 0.6px;
          cursor: pointer;
          transition: transform .18s ease, box-shadow .18s ease, background .18s ease, color .18s ease;
        }
        .top-nav-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 30px rgba(255,215,0,0.18);
          background: linear-gradient(135deg, ${GOLD}, #e6b800);
          color: #111;
        }
        .top-nav-btn.active {
          background: linear-gradient(135deg, ${GOLD}, #e6b800);
          color: #111;
          box-shadow: 0 10px 28px rgba(255,215,0,0.2);
        }

        .hero-left-wrap { display: flex; gap: 32px; align-items: center; }
        .hero-left-title { line-height: 1.06; letter-spacing: 0.8px; }
        .hero-cta {
          margin-top: 20px;
          padding: 12px 22px;
          border-radius: 10px;
          border: 2px solid ${GOLD};
          background: ${GOLD};
          color: #111;
          font-weight: 900;
          cursor: pointer;
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .hero-cta:hover { transform: translateY(-6px); box-shadow: 0 26px 60px rgba(255,215,0,0.18); }

        .reveal { opacity: 0; transform: translateY(20px); transition: opacity .7s cubic-bezier(.16,.8,.2,1), transform .7s cubic-bezier(.16,.8,.2,1); }
        .reveal.show { opacity: 1; transform: translateY(0); }

        @media (max-width: 880px) {
          header { padding: 8px 12px; }
          .top-nav { display: none; }
        }
        @media (max-width: 920px) {
          .hero-left-wrap { flex-direction: column; align-items: flex-start; gap: 16px; }
        }
      `}</style>

      {/* TOP NAV */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 2000,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "20px 0px",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <div className="top-nav" style={{ display: "flex", gap: 16 }}>
          <button className={`top-nav-btn ${activeNav === "home" ? "active" : ""}`} onClick={() => scrollToSection(homeRef, "home")}>Home</button>
          <button className={`top-nav-btn ${activeNav === "about" ? "active" : ""}`} onClick={() => scrollToSection(aboutRef, "about")}>About</button>
          <button className={`top-nav-btn ${activeNav === "services" ? "active" : ""}`} onClick={() => scrollToSection(servicesRef, "services")}>Services</button>
          <button className={`top-nav-btn ${activeNav === "contact" ? "active" : ""}`} onClick={() => scrollToSection(contactRef, "contact")}>Contact</button>
          <button className="top-nav-btn" onClick={() => navigate("/book-appointment")}>Book</button>
        </div>
      </header>

      <div style={{ height: 84 }} />

      {/* HERO SECTION */}
      <section
        ref={homeRef}
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "0 6rem",
          position: "relative",
        }}
      >
        <div style={{ width: "50%", zIndex: 5 }} className="hero-left-wrap">
          <div>
            <h1 className="hero-left-title" style={{ fontSize: "3.6rem", fontWeight: 900, lineHeight: "1.07", margin: 0 }}>
              WE CREATE <br />
              <span style={{ color: GOLD }}>HEALTHY</span> <br />
              <span style={{ color: GOLD }}>BEAUTIFUL</span> <br />
              <span style={{ color: "#222", fontFamily: "'Brush Script MT', cursive", fontSize: "4.6rem", fontStyle: "italic" }}>
                Smiles
              </span>
            </h1>

            <button
              className="hero-cta"
              onClick={() => navigate("/book-appointment")}
              aria-label="Book appointment"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        ref={aboutRef}
        className={`reveal ${aboutVisible ? "show" : ""}`}
        style={{
          maxWidth: 1100,
          margin: "3.25rem auto",
          padding: "3rem 2rem",
          borderRadius: 20,
          background: WHITE,
          boxShadow: "0 18px 50px rgba(0,0,0,0.06)",
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>About Amethyst Dental Clinic</h2>
        <p style={{ marginTop: 8, lineHeight: 1.7 }}>
          We combine skilled clinicians with modern equipment to provide thoughtful, comfortable dental care.
          Our team focuses on prevention, beautiful restorations and gentle, modern treatment.
        </p>
      </section>

      {/* SERVICES */}
   {/* SERVICES */}
<section ref={servicesRef} style={{ maxWidth: 1100, margin: "2rem auto", padding: "0 1rem" }}>
  <h2 className={`reveal ${servicesVisible ? "show" : ""}`} style={{ fontSize: "1.8rem", fontWeight: 800 }}>
    Our Services
  </h2>

  <div style={{
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    marginTop: 12
  }}>
    {services.map((s, idx) => (
      <div
        key={s.name}
        className={`reveal ${servicesVisible ? "show" : ""}`}
        style={{
          background: WHITE,
          padding: 18,
          borderRadius: 12,
          boxShadow: "0 14px 30px rgba(0,0,0,0.06)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          transitionDelay: `${servicesVisible ? idx * 70 : 0}ms`,
          cursor: "pointer",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"}
        onMouseLeave={e => e.currentTarget.style.transform = "translateY(0) scale(1)"}
      >
        <img
          src={s.image}
          alt={s.name}
          style={{
            width: "100%",
            aspectRatio: "4/3",
            objectFit: "cover",
            borderRadius: 10,
            marginBottom: 12,
            backgroundColor: "#f0f0f0"
          }}
        />
        <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
        <h3 style={{ marginTop: 0 }}>{s.name}</h3>
        <p style={{ margin: 0, color: "#555" }}>{s.description}</p>
      </div>
    ))}
  </div>
</section>

      {/* CONTACT */}
      <section
        ref={contactRef}
        className={`reveal ${contactVisible ? "show" : ""}`}
        style={{
          maxWidth: 1100,
          margin: "3rem auto",
          padding: 20,
          background: WHITE,
          borderRadius: 14,
          boxShadow: "0 18px 50px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 420px" }}>
            <h3 style={{ fontSize: "1.6rem", margin: 0 }}>Contact Us</h3>
            <p style={{ marginTop: 10 }}>Have questions? Reach out — we’re here to help.</p>

            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <ContactRow icon="📍" title="Address" text="Brgy. Your Location Here" />
              <ContactRow icon="📞" title="Phone" text="0910-920-7877"/>
              <ContactRow icon="✉️" title="Email" text="amethystdentalclinic@gmail.com" />
              <ContactRow icon="🕒" title="Hours" text="Mon–Sat 9:00 AM – 4:00 PM" />
            </div>
          </div>

          <div style={{ flex: "0 1 420px", minHeight: 260, position: "relative" }}>
            <div className="map-wrap" style={{ width: "100%", height: "100%", position: "relative", borderRadius: 12 }}>
              <iframe
                title="clinic-map"
                className="map-frame"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.318060207433!2d121.05007017520808!3d14.580943585903078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9954c08c46b%3A0x63994677f8e7fd5e!2sAmethyst%20Dental%20Clinic!5e0!3m2!1sen!2sph!4v1763739311428!5m2!1sen!2sph"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <footer style={{ marginTop: 36, padding: "28px 8px", textAlign: "center", color: "#666" }}>
        <div style={{ fontWeight: 800 }}>Amethyst Dental Clinic</div>
        <div>© {new Date().getFullYear()} All rights reserved.</div>
      </footer>
    </div>
  );
}

/* CONTACT ROW */
function ContactRow({ icon, title, text }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <div style={{ fontSize: 18 }}>{icon}</div>
      <div>
        <strong style={{ display: "block", marginBottom: 4 }}>{title}</strong>
        <div style={{ color: "#333" }}>{text}</div>
      </div>
    </div>
  );
}
