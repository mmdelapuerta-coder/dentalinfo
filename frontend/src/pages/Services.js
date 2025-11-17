import React from 'react';

// Optionally you can use react-icons or any icon library of your choice. Here's a simple example without icons.
const servicesList = [
  { title: "Consultation", description: "Personalized dental consultations for your oral health." },
  { title: "Oral Prophylaxis", description: "Professional dental cleaning and plaque removal." },
  { title: "Orthodontics", description: "Braces and aligners for a perfect smile." },
  { title: "Dentures", description: "Custom-fit dentures for natural-looking teeth replacement." },
  { title: "Teeth Whitening", description: "Safe and effective procedures for a brighter smile." },
  { title: "Extraction", description: "Pain-free tooth removal by expert dentists." },
  { title: "Crowns and Bridges", description: "Restorative treatments to strengthen your teeth." },
  { title: "Root Canal Treatment", description: "Advanced care to save infected teeth." },
];

const Services = () => {
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ color: '#D4AF37', textAlign: 'center', marginBottom: '2rem', fontWeight: '900', fontSize: '2.5rem' }}>Our Services</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.8rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {servicesList.map(({ title, description }, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(212, 175, 55, 0.2)',
            padding: '1.8rem',
            transition: 'transform 0.3s ease',
            cursor: 'default'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <h2 style={{ color: '#B8860B', marginBottom: '0.8rem', fontWeight: '700' }}>{title}</h2>
            <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.5' }}>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
