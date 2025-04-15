// routes/activityLogRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllLogs,
  getLogById,
  deleteLog,
  clearAllLogs
} = require("../controllers/Activitycontorller");

router.get("/logs", getAllLogs);                // GET /logs
router.get("/getalllogs/:id", getLogById);             // GET /logs/:id
router.delete("delete/logs/:id", deleteLog);           // DELETE /logs/:id
router.delete("/logs/", clearAllLogs);           // DELETE /logs (admin only)

module.exports = router;
