
const jwt = require("jsonwebtoken");
const User = require("../models/User");


exports.login = (req, res) => {
  const { email, password } = req.body;

  const user = User.findByEmail(email);
  if (!user || user.password !== password || user.role !== "admin") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
};
