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

// Response Template
const responseCard = (code, message, data) => {
  return {
    response_code: code,
    response_message: message,
    data: data,
  };
};

const errorCard = (code, message, err) => {
  return {
    response_code: code,
    response_message: message,
    error: err,
  };
};

// Create a new user
app.post("/users", verifyToken, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json(responseCard(201, "Successfully add a user", user));
  } catch (error) {
    res
      .status(400)
      .json(errorCard(400, "Failed to add a user!", error.message));
  }
});

// Get all users
app.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(responseCard(200, "All users are loaded", users));
  } catch (error) {
    res.status(500).json(errorCard(500, "Cannot load users!", error.message));
  }
});

// Get a user by ID
app.get("/users/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json(errorCard(404, "User not found!", null));
    }
    res.status(200).json(responseCard(200, "Found a user", user));
  } catch (error) {
    res
      .status(500)
      .json(errorCard(500, "Error while finding user", error.message));
  }
});

// Update a user by ID
app.put("/users/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json(errorCard(404, "User not found!", "Cannot update a ghost"));
    }
    await user.update(req.body);
    res.status(200).json(responseCard(200, "Successfully update a user", user));
  } catch (error) {
    res
      .status(400)
      .json(errorCard(400, "Failed to update user!", error.message));
  }
});

// Delete a user by ID
app.delete("/users/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json(errorCard(404, "User not found", null));
    }
    let username = user.name;
    await user.destroy();
    res
      .status(204)
      .send(responseCard(204, `Successfully delete ${username}`, null));
  } catch (error) {
    res
      .status(500)
      .json(errorCard(500, `Cannot delete ${username}`, error.message));
  }
});

app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res
      .status(401)
      .json(errorCard(401, "Who are you?", "Authentication failed"));
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.dataValues.password
  );

  if (!passwordMatch) {
    return res
      .status(401)
      .json(errorCard(401, "Invalid credentials!", "Authentication failed"));
  }

  const token = jwt.sign({ userId: user.id }, "bci-fixed-asset-management", {
    expiresIn: "1h",
  });

  res.status(200).json(
    responseCard(200, "Successfully logged in", {
      token: token,
    })
  );
});

// Change Password
app.put("/users/chpwd/:id", verifyToken, async (req, res) => {
  const { oldPass, newPass, confirmPass } = req.body;
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json(errorCard(404, "User not found!", "User not found"));
    }

    const passwordMatch = await bcrypt.compare(
      oldPass,
      user.dataValues.password
    );

    if (!passwordMatch) {
      return res
        .status(401)
        .json(errorCard(401, "Authentication failed", "Invalid old password"));
    }

    if (newPass !== confirmPass) {
      return res
        .status(401)
        .json(
          errorCard(
            401,
            "Error while changing password",
            "New password didn't match the confirm password"
          )
        );
    }

    const hashedPassword = await bcrypt.hash(newPass, 10);
    await user.update({ password: hashedPassword });
    res
      .status(200)
      .json(responseCard(200, "Successfully change password", user));
  } catch (error) {
    res
      .status(400)
      .json(errorCard(400, "Failed to update user!", error.message));
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`User management server is running on http://localhost:${PORT}`);
});
