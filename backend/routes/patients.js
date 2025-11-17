import express from "express";
import pool from "../db.js";

const router = express.Router();

// CREATE a new patient
router.post("/", async (req, res) => {
  const { name, age, contact, category, diagnosis } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO patients (name, age, contact, category, diagnosis) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, age, contact, category, diagnosis]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating patient");
  }
});

// GET all patients
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM patients ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching patients");
  }
});

// GET a single patient by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM patients WHERE id=$1", [id]);
    if (result.rows.length === 0) return res.status(404).send("Patient not found");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching patient");
  }
});

// UPDATE a patient by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, contact, category, diagnosis } = req.body;
  try {
    const result = await pool.query(
      "UPDATE patients SET name=$1, age=$2, contact=$3, category=$4, diagnosis=$5 WHERE id=$6 RETURNING *",
      [name, age, contact, category, diagnosis, id]
    );
    if (result.rows.length === 0) return res.status(404).send("Patient not found");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating patient");
  }
});

// DELETE a patient by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM patients WHERE id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).send("Patient not found");
    res.json({ message: "Patient deleted ✅", patient: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting patient");
  }
});

export default router;
