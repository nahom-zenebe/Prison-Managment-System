const ActivityLog = require('../models/Activityandlog');

// Get top 4 recent logs (optionally filter by userId, action, or target)
const getAllLogs = async (req, res) => {
  try {
    const { userId, action, target } = req.query;

    // Build query dynamically
    const query = {};
    if (userId) query.userId = userId;
    if (action) query.action = action;
    if (target) query.target = target;

    const logs = await ActivityLog.find(query)
      .sort({ createdAt: -1 }) // Latest first
      .limit(4); // Only top 4

    res.status(200).json(logs);
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ error: "Failed to fetch activity logs" });
  }
};

// Get single log by ID
const getLogById = async (req, res) => {
  try {
    const log = await ActivityLog.findById(req.params.id);
    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }
    res.status(200).json(log);
  } catch (err) {
    console.error("Error fetching log:", err);
    res.status(500).json({ error: "Failed to fetch log" });
  }
};

// Delete a specific log
const deleteLog = async (req, res) => {
  try {
    const log = await ActivityLog.findByIdAndDelete(req.params.id);
    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }
    res.status(200).json({ message: "Log deleted successfully" });
  } catch (err) {
    console.error("Error deleting log:", err);
    res.status(500).json({ error: "Failed to delete log" });
  }
};

// Clear all logs (⚠️ Only for Admin use)
const clearAllLogs = async (req, res) => {
  try {
    await ActivityLog.deleteMany({});
    res.status(200).json({ message: "All logs cleared" });
  } catch (err) {
    console.error("Error clearing logs:", err);
    res.status(500).json({ error: "Failed to clear logs" });
  }
};

module.exports = {
  getAllLogs,
  getLogById,
  deleteLog,
  clearAllLogs
};
