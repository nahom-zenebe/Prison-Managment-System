const bcrypt = require("bcryptjs");
const UserBase = require("../models/admin.js");
const generateToken = require("../utils/generateToken.js");

// signup
const signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if username already exists
    const existingUser = await UserBase.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const user = new UserBase({
      username,
      password: hashedPassword,
      role,
    });
    await user.save();

    // Generate token and return response
    generateToken(user._id, res);
    res.status(201).json({
      id: user._id,
      username: user.username,
    });
  } catch (err) {
    console.error("Error when signing up:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserBase.findOne({ username: username });
    const validpassword = await bcrypt.compare(password, user?.password || "");

    console.log(user);
    console.log(validpassword);
    if (!user || !validpassword) {
      return res.status(403).send("Invalid credentials");
    }

    generateToken(user._id, res);

    res.status(201).json({
      id: user.id,
      username: user.username,
    });
  } catch (err) {
    console.log("error while logging in", err);
    res.status(501).json({ error: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(201).json({ status: "successful" });
  } catch (error) {
    console.log("Error while logging out", error);
    res.status(500).json({ error: "Error while logging out" });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
