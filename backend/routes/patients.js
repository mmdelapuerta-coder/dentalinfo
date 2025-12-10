import express from "express";
import pool from "../db.js";
import verifyToken from "./middleware/verifyToken.js";

const router = express.Router();

// ---------------------
// GET all appointments
// ---------------------
router.get("/", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, phone, date, time, reason FROM appointments ORDER BY date ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ---------------------
// GET single appointment by ID
// ---------------------
router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT id, name, email, phone, date, time, reason FROM appointments WHERE id=$1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching appointment:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ---------------------
// CREATE new appointment
// ---------------------
router.post("/", verifyToken, async (req, res) => {
  const { name, email, phone, date, time, reason } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO appointments (name, email, phone, date, time, reason) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, phone, date, time, reason",
      [name, email, phone, date, time, reason]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ---------------------
// UPDATE appointment by ID
// ---------------------
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, date, time, reason } = req.body;

  try {
    const result = await pool.query(
      `UPDATE appointments 
       SET name=$1, email=$2, phone=$3, date=$4, time=$5, reason=$6
       WHERE id=$7
       RETURNING id, name, email, phone, date, time, reason`,
      [name, email, phone, date, time, reason, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating appointment:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ---------------------
// DELETE appointment by ID
// ---------------------
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM appointments WHERE id=$1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted successfully ✅" });
  } catch (err) {
    console.error("Error deleting appointment:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
