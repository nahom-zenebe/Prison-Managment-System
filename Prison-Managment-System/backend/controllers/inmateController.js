const inmate = require('../models/inmate');
const ActivityLog = require('../models/Activityandlog');


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
        console.error('Logging failed:', error);
    }
};

const getAllInmates = async (req, res, next) => {
    try {
        const Inmates = await inmate.find();
        if (!Inmates) {
            return res.status(404).json({ message: "Users are not found" });
        }
        return res.status(200).json({ Inmates });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
};

const getReleasedInmates = async (req, res, next) => {
    try {
        const releasedInmates = await inmate.find({ status: "Released" });
        res.status(200).json(releasedInmates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getWantedInmates = async (req, res, next) => {
    try {
        const wantedInmates = await inmate.find({ status: "Wanted" });
        res.status(200).json(wantedInmates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getCurrentInmates = async (req, res, next) => {
    try {
        const currentInmates = await inmate.find({ status: "Current" });
        res.status(200).json(currentInmates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const addInmates = async (req, res, next) => {
    const { 
        fullname, initialname, birthday, gender, nic, address, contactnumber,
        emergencycontactname, emergencycontactnumber, marital, occupation,
        education, religion, inmatenumber, offense, sentence, admissionDate,
        releaseDate, years, months, days, cellNumber, medicalConditions,
        additionalNotes, realReleaseDate, releaseReason, releaseBy,
        confirmReleased, status, escapedDate, escapedTime, escapedLocation,
        physicalDescription, clothingDescription, foundDate
    } = req.body;

    const image = req.file ? req.file.filename : null;

    try {
        const newInmate = new inmate({
            image, fullname, initialname, birthday, gender, nic, address,
            contactnumber, emergencycontactname, emergencycontactnumber, marital,
            occupation, education, religion, inmatenumber, offense, sentence,
            admissionDate, releaseDate, years, months, days, cellNumber,
            medicalConditions, additionalNotes, realReleaseDate, releaseReason,
            releaseBy, confirmReleased, status, escapedDate, escapedTime,
            escapedLocation, physicalDescription, clothingDescription, foundDate
        });

        const savedInmate = await newInmate.save();

        await logActivity(
            req.user?._id, // assumes req.user is populated via auth middleware
            'ADD_INMATE',
            `Inmate ${fullname} added.`,
            'Inmate',
            savedInmate._id,
            req.ip
        );

        res.status(201).send('New inmate added successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to add inmate');
    }
};

const getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const Inmate = await inmate.findById(id);
        if (!Inmate) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ Inmate });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

const deleteInmate = async (req, res, next) => {
    const id = req.params.id;

    try {
        const Inmate = await inmate.findByIdAndDelete(id);

        if (!Inmate) {
            return res.status(404).json({ message: "Unable to delete inmate" });
        }

        await logActivity(
            req.user?._id,
            'DELETE_INMATE',
            `Deleted inmate: ${Inmate.fullname}`,
            'Inmate',
            id,
            req.ip
        );

        return res.status(200).json({ Inmate });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

const updateInmate = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedInmate = await inmate.findByIdAndUpdate(id, req.body, { new: true });

        await logActivity(
            req.user?._id,
            'UPDATE_INMATE',
            `Updated inmate: ${updatedInmate.fullname}`,
            'Inmate',
            id,
            req.ip
        );

        res.status(200).json(updatedInmate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAllInmates = getAllInmates;
exports.getReleasedInmates = getReleasedInmates;
exports.getWantedInmates = getWantedInmates;
exports.getCurrentInmates = getCurrentInmates;
exports.addInmates = addInmates;
exports.getById = getById;
exports.deleteInmate = deleteInmate;
exports.updateInmate = updateInmate;
