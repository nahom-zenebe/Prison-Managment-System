const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  action: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  target: {
    type: String,
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String
  },
  location: {
    type: String
  }
});

const ActivityLog=mongoose.model("ActivityLog", activityLogSchema)
module.exports =ActivityLog ;
