
import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    reason: "", 
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  
    const existing = JSON.parse(localStorage.getItem("appointments")) || [];
    localStorage.setItem(
      "appointments",
      JSON.stringify([...existing, formData])
    );

    setFormData({ name: "", email: "", phone: "", date: "", reason: "" });
    setSuccess(true);


    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="max-w-xl mx-auto p-8 rounded shadow-md grid gap-4 bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Book Appointment</h2>

      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
          Appointment successfully saved!
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-600"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-600"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-600"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-600"
          required
        />

        {/* Dropdown for Reason of Visit */}
        <select
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-600"
          required
        >
          <option value="" disabled>
            Select Reason for Visit
          </option>
          <option value="Consultation">Consultation</option>
          <option value="Teeth Cleaning">Teeth Cleaning</option>
          <option value="Orthodontics">Orthodontics</option>
          <option value="Dentures">Dentures</option>
          <option value="Teeth Whitening">Teeth Whitening</option>
          <option value="Extraction">Extraction</option>
          <option value="Crowns and Bridges">Crowns and Bridges</option>
          <option value="Root Canal Treatment">Root Canal Treatment</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white font-bold px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
