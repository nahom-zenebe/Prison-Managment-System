const HealthRecord = require("../models/healthrecord");
const ActivityLog = require("../models/Activityandlog");

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

exports.createHealthRecord = async (req, res) => {
  try {
    const healthRecord = new HealthRecord(req.body);
    await healthRecord.save();

    await logActivity(
      req.user?._id || null,
      "CREATE",
      "New health record created",
      "HealthRecord",
      healthRecord._id,
      req.ip
    );

    res.status(201).send(healthRecord);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllHealthRecords = async (req, res) => {
  try {
    const healthRecords = await HealthRecord.find({});

    await logActivity(
      req.user?._id || null,
      "READ",
      "Fetched all health records",
      "HealthRecord",
      null,
      req.ip
    );

    res.send(healthRecords);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getHealthRecordById = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id);
    if (!healthRecord) {
      return res.status(404).send();
    }

    await logActivity(
      req.user?._id || null,
      "READ",
      `Fetched health record with ID ${req.params.id}`,
      "HealthRecord",
      req.params.id,
      req.ip
    );

    res.send(healthRecord);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!healthRecord) {
      return res.status(404).send();
    }

    await logActivity(
      req.user?._id || null,
      "UPDATE",
      `Updated health record with ID ${req.params.id}`,
      "HealthRecord",
      req.params.id,
      req.ip
    );

    res.send(healthRecord);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findByIdAndDelete(req.params.id);
    if (!healthRecord) {
      return res.status(404).send();
    }

    await logActivity(
      req.user?._id || null,
      "DELETE",
      `Deleted health record with ID ${req.params.id}`,
      "HealthRecord",
      req.params.id,
      req.ip
    );

    res.send(healthRecord);
  } catch (error) {
    res.status(500).send(error);
  }
};
