const users = [
  { id: 1, email: "admin@test.com", password: "admin123", role: "admin" },
];

module.exports = {
  findByEmail: (email) => users.find((u) => u.email === email),
};
