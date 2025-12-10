import React, { useCallback, useEffect, useState, useMemo } from "react";
import "./BookAppointment.css";

// Configuration constants
const CLINIC_OPEN = 9;
const CLINIC_CLOSE = 16;
const SLOT_MINUTES = 30;
const TREATMENT_DURATIONS = {
  Consultation: 30,
  "Teeth Cleaning": 30,
  Orthodontics: 60,
  Dentures: 60,
  "Teeth Whitening": 30,
  Extraction: 60,
  "Crowns & Bridges": 60,
  "Root Canal": 60,
};

const pad = (n) => String(n).padStart(2, "0");
const hhmm = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
const parseTimeOnDate = (dateStr, timeStr) => new Date(`${dateStr}T${timeStr}:00`);
const addMinutes = (date, min) => new Date(date.getTime() + min * 60000);

// Floating Input Component
function FloatingInput({ name, type = "text", value, onChange, label, required }) {
  return (
    <div className="input-group">
      <input
        id={name}
        name={name}
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
        required={required}
        autoComplete="off"
        aria-label={label}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

// Floating Select Component
function FloatingSelect({ name, value, onChange, label, children, required }) {
  return (
    <div className="input-group">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-label={label}
      >
        {children}
      </select>
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

// Time Chips Component
function TimeChips({ slots, value, onPick }) {
  if (!slots || slots.length === 0) {
    return <div className="no-slots">No available slots for this day.</div>;
  }

  return (
    <div className="chips-wrap" role="listbox" aria-label="Available times">
      {slots.map((s) => (
        <button
          key={s.label}
          type="button"
          className={`chip ${s.disabled ? "disabled" : ""} ${value === s.label ? "selected" : ""}`}
          onClick={() => !s.disabled && onPick(s.label)}
          disabled={s.disabled}
          aria-pressed={value === s.label}
        >
          <span className="chip-time">{s.label}</span>
          {s.disabled ? <span className="chip-sub">Booked</span> : <span className="chip-sub">Free</span>}
        </button>
      ))}
    </div>
  );
}

// Confirm Modal Component
function ConfirmModal({ open, form, onClose, onConfirm, escapeHtml }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Confirm appointment">
      <div className="modal-card" role="document">
        <div className="modal-top">
          <div className="gold-badge">Confirm</div>
          <h3>Confirm your appointment</h3>
          <p className="modal-sub">Please review details before confirming.</p>
        </div>

        <div className="confirm-details">
          <div className="detail-row"><span>Full name</span><strong>{escapeHtml(form.name)}</strong></div>
          <div className="detail-row"><span>Email</span><strong>{escapeHtml(form.email)}</strong></div>
          <div className="detail-row"><span>Phone</span><strong>{escapeHtml(form.phone)}</strong></div>
          <div className="detail-row"><span>Date</span><strong>{escapeHtml(form.date)}</strong></div>
          <div className="detail-row"><span>Time</span><strong>{escapeHtml(form.time)}</strong></div>
          <div className="detail-row"><span>Treatment</span><strong>{escapeHtml(form.reason)}</strong></div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm}>Confirm Appointment</button>
        </div>
      </div>
    </div>
  );
}

export default function BookAppointment() {
  const [loaded, setLoaded] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments
  useEffect(() => {
    fetch("http://localhost:5000/patients")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAppointments(data);
          setLoaded(true);  // Mark as loaded after successful fetch
        } else {
          console.error("Expected an array but got:", data);
          setAppointments([]);
          setLoaded(true);  // Set as loaded even if fetch fails
        }
      })
      .catch((err) => {
        console.error("Failed to load appointments:", err);
        setAppointments([]);
        setLoaded(true);  // Set as loaded in case of error
      });
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    reason: "",
    time: "",
  });

  const { date, reason } = form;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [finalized, setFinalized] = useState(false);

  // Available slots
  const availableSlots = useMemo(() => {
    if (!date || !reason) return [];

    const duration = TREATMENT_DURATIONS[reason] || 30;
    const startBase = parseTimeOnDate(date, `${pad(CLINIC_OPEN)}:00`);
    const endDay = parseTimeOnDate(date, `${pad(CLINIC_CLOSE)}:00`);

    const slots = [];
    for (let offset = 0; ; offset += SLOT_MINUTES) {
      const start = addMinutes(startBase, offset);
      const end = addMinutes(start, duration);
      if (end > endDay) break;
      slots.push({ start, end });
    }

    const existing = appointments
      .filter((a) => a.date === date)
      .map((a) => {
        const s = parseTimeOnDate(a.date, a.time);
        const dur = TREATMENT_DURATIONS[a.reason] || 30;
        return { start: s, end: addMinutes(s, dur) };
      });

    return slots.map((slot) => {
      const conflict = existing.some((e) => slot.start < e.end && e.start < slot.end);
      return { label: hhmm(slot.start), disabled: conflict };
    });
  }, [date, reason, appointments]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "date") {
      const today = new Date();
      const todayISO = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().slice(0, 10);
      if (value < todayISO) {
        alert("Please select today or a future date.");
        return;
      }
    }
    if (name === "date" || name === "reason") {
      setForm((f) => ({ ...f, [name]: value, time: "" }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }, []);

  const pickSlot = useCallback((label) => {
    if (!label) return;
    setForm((f) => ({ ...f, time: label }));
  }, []);

  const continueToConfirm = useCallback((e) => {
    e.preventDefault();
    if (!form.time) {
      alert("Please select a time.");
      return;
    }
    setConfirmOpen(true);
  }, [form.time]);

  const finalizeBooking = useCallback(() => {
    const toSave = { ...form };

    fetch("http://localhost:5000/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toSave),
    })
    .then((res) => res.json())
    .then((saved) => {
      console.log("Saved appointment:", saved);  // Debugging line
      setAppointments((prev) => [...prev, saved]);
    })
    .catch((err) => console.error("Save failed:", err));

    setConfirmOpen(false);
    setFinalized(true);

    setTimeout(() => {
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        reason: "",
        time: "",
      });
      setTimeout(() => setFinalized(false), 2400);
    }, 700);
  }, [form]);

  const escapeHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const lastSaved = appointments.length ? appointments[appointments.length - 1] : null;

  return (
    <div className="page">
      <div className="float-orb orb-left" />
      <div className="float-orb orb-right" />

      <div className={`card-wrapper ${loaded ? "show" : ""}`}>
        <div className="form-card">
          <header className="card-header">
            <div>
              <h1 className="title">Book Appointment</h1>
              <p className="subtitle">We happy to serve you!!!</p>
            </div>
          </header>

          {finalized ? (
            <div className="success-stage">
              <div className="check-anim" aria-hidden>✔</div>
              <h2>Appointment confirmed</h2>

              {lastSaved && (
                <div className="recent">
                  <strong>{lastSaved.reason}</strong>
                  <div>{lastSaved.date} • {lastSaved.time}</div>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={continueToConfirm} className="main-form">
              <FloatingInput name="name" label="Full name" value={form.name} onChange={handleChange} required />
              <FloatingInput name="email" type="email" label="Email" value={form.email} onChange={handleChange} required />
              <FloatingInput name="phone" label="Phone" value={form.phone} onChange={handleChange} required />

              <div className="row-2">
                <FloatingInput
                  name="date"
                  type="date"
                  label="Choose date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
                <FloatingSelect
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  label="Treatment"
                  required
                >
                  <option value=""></option>
                  {Object.keys(TREATMENT_DURATIONS).map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </FloatingSelect>
              </div>

              {date && reason && (
                <>
                  <div className="time-legend">
                    <div className="legend-item"><span className="dot free" /> Available</div>
                    <div className="legend-item"><span className="dot busy" /> Booked</div>
                  </div>
                  <TimeChips slots={availableSlots} value={form.time} onPick={pickSlot} />
                </>
              )}

              <button className="submit-btn" type="submit">Continue — Confirm</button>
            </form>
          )}
        </div>
      </div>

      <ConfirmModal
        open={confirmOpen}
        form={form}
        onClose={() => setConfirmOpen(false)}
        onConfirm={finalizeBooking}
        escapeHtml={escapeHtml}
      />
    </div>
  );
}
