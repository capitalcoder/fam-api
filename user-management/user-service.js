const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const { User } = require("./models");
const verifyToken = require("./auth-middleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Create a new user
app.post("/users", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
app.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a user by ID
app.get("/users/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User  not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
app.put("/users/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User  not found" });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user by ID
app.delete("/users/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User  not found" });
    }
    await user.destroy();
    res.status(204).send({ status: '204', message: 'Berhasil menghapus data pengguna' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!user) return res.status(401).json({ error: "Authentication failed" });

  const passwordMatch = await bcrypt.compare(
    password,
    user.dataValues.password
  );
  if (!passwordMatch)
    return res.status(401).json({ error: "Authentication failed" });

  const token = jwt.sign({ userId: user._id }, "bci-fixed-asset-management", {
    expiresIn: "1h",
  });
  res
    .status(200)
    .json({ status: 200, message: "Logged in succesfully ", token: token, username: user.name, role: user.role });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server user is running on http://localhost:${PORT}`);
});
