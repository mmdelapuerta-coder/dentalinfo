import express from "express";
import cors from "cors";
import pool from "./db.js";
import authRoutes from "./routes/auth.js";
import patientRoutes from "./routes/patients.js";


const app = express();           // <-- define app FIRST
app.use(cors());
app.use(express.json());

// AUTH ROUTES
app.use("/auth", authRoutes);    // <-- now this works

app.use("/patients", patientRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// TEST DATABASE CONNECTION
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
