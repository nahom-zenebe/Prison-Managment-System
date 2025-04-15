const bcrypt = require("bcryptjs");
const UserBase = require("../models/admin.js");
const generateToken = require("../utils/generateToken.js");
const ActivityLog = require("../models/Activityandlog");

// Reusable activity logger
const logActivity = async (userId, action, description, target, targetId, ipAddress) => {
  try {
    await ActivityLog.create({
      userId,
      action,
      description,
      target,
      targetId,
      ipAddress,
    });
  } catch (err) {
    console.error("Activity logging failed:", err);
  }
};

// signup
const signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await UserBase.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserBase({ username, password: hashedPassword, role });
    await user.save();

    await logActivity(
      user._id,
      "SIGNUP",
      `User signed up with username: ${username}`,
      "User",
      user._id,
      req.ip
    );

    generateToken(user._id, res);
    res.status(201).json({ id: user._id, username: user.username });
  } catch (err) {
    console.error("Error when signing up:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserBase.findOne({ username });
    const validpassword = await bcrypt.compare(password, user?.password || "");

    if (!user || !validpassword) {
      return res.status(403).send("Invalid credentials");
    }

    await logActivity(
      user._id,
      "LOGIN",
      `User logged in with username: ${username}`,
      "User",
      user._id,
      req.ip
    );

    generateToken(user._id, res);
    res.status(201).json({ id: user.id, username: user.username });
  } catch (err) {
    console.log("error while logging in", err);
    res.status(501).json({ error: "Internal Server Error" });
  }
};

// logout
const logout = (req, res) => {
  try {
    const userId = req.user?._id || null;

    res.cookie("jwt", "", { maxAge: 0 });

    if (userId) {
      logActivity(userId, "LOGOUT", "User logged out", "User", userId, req.ip);
    }

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
