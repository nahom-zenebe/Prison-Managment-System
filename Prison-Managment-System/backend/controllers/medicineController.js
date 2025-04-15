const Medicine = require("../models/medicineModel");
const ActivityLog = require("../models/Activityandlog");

// Reusable logger
const logActivity = async (userId, action, description, target, targetId, ipAddress) => {
    try {
        await ActivityLog.create({
            userId,
            action,
            description,
            target,
            targetId,
            ipAddress
        });
    } catch (error) {
        console.error("Logging failed:", error);
    }
};

// Get all medicines
const getAllMedicine = async (req, res, next) => {
    try {
        const medicine = await Medicine.find();
        if (!medicine) {
            return res.status(404).json({ message: "medicine not found" });
        }
        return res.status(200).json({ medicine });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Add new medicine
const addMedicine = async (req, res, next) => {
    const { name, type, mg, quantity, expire, supplier, note } = req.body;

    try {
        const medicine = new Medicine({ name, type, mg, quantity, expire, supplier, note });
        const saved = await medicine.save();

        await logActivity(
            req.user?._id,
            'ADD_MEDICINE',
            `Added medicine: ${name}`,
            'Medicine',
            saved._id,
            req.ip
        );

        return res.status(200).json({ medicine: saved });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to add medicine" });
    }
};

// Get medicine by ID
const getByMedicineId = async (req, res, next) => {
    const id = req.params.id;
    try {
        const medicine = await Medicine.findById(id);
        if (!medicine) {
            return res.status(404).send({ message: "unavailable medicine" });
        }
        return res.status(200).json({ medicine });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Update medicine
const updateMedicine = async (req, res, next) => {
    const id = req.params.id;
    const { name, type, mg, quantity, expire, supplier, note } = req.body;

    try {
        const medicine = await Medicine.findByIdAndUpdate(
            id,
            { name, type, mg, quantity, expire, supplier, note },
            { new: true }
        );

        if (!medicine) {
            return res.status(404).send({ message: "unavailable update medicine" });
        }

        await logActivity(
            req.user?._id,
            'UPDATE_MEDICINE',
            `Updated medicine: ${medicine.name}`,
            'Medicine',
            medicine._id,
            req.ip
        );

        return res.status(200).json({ medicine });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete medicine
const deleteMedicine = async (req, res, next) => {
    const id = req.params.id;

    try {
        const medicine = await Medicine.findByIdAndDelete(id);

        if (!medicine) {
            return res.status(404).send({ message: "unable to delete medicine" });
        }

        await logActivity(
            req.user?._id,
            'DELETE_MEDICINE',
            `Deleted medicine: ${medicine.name}`,
            'Medicine',
            id,
            req.ip
        );

        return res.status(200).json({ medicine });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAllMedicine = getAllMedicine;
exports.addMedicine = addMedicine;
exports.getByMedicineId = getByMedicineId;
exports.updateMedicine = updateMedicine;
exports.deleteMedicine = deleteMedicine;
