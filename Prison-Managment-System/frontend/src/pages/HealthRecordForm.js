import React, { useState } from "react";
import axios from "axios";
import "./healthRecordForm.css";

const HealthRecordForm = ({ inmateName }) => {
  const [formData, setFormData] = useState({
    InmateName: inmateName,
    dateOfBirth: "",
    diagnosis: "",
    medications: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateInmateName = (value) => {
    const regex = /^[a-zA-Z. ]+$/;
    if (!value.match(regex)) {
      setErrors((prev) => ({
        ...prev,
        InmateName: 'Inmate Name must include only letters and "." symbol.',
      }));
    } else {
      setErrors((prev) => ({ ...prev, InmateName: "" }));
    }
  };

  const validateDateOfBirth = (value) => {
    const dob = new Date(value);
    const today = new Date();
    const hundredYearsAgo = new Date(
      today.getFullYear() - 100,
      today.getMonth(),
      today.getDate()
    );
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    if (dob > today || dob < hundredYearsAgo) {
      setErrors((prev) => ({
        ...prev,
        dateOfBirth:
          "Date of Birth must be within the last 100 years and not in the future.",
      }));
    } else if (dob > eighteenYearsAgo) {
      setErrors((prev) => ({
        ...prev,
        dateOfBirth: "Person must be at least 18 years old.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, dateOfBirth: "" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Apply filter on diagnosis input
    const filteredValue =
      name === "diagnosis" ? value.replace(/[^a-zA-Z\s]/g, "") : value;

    setFormData((prev) => ({ ...prev, [name]: filteredValue }));

    if (name === "InmateName") validateInmateName(filteredValue);
    if (name === "dateOfBirth") validateDateOfBirth(filteredValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error !== "")) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "https://prison-managment-system-backend.onrender.com/healthrecord/addhealthrecords",
        formData
      );
      console.log("Success:", response.data);
      alert("Health record added successfully");
      setFormData({
        InmateName: inmateName,
        dateOfBirth: "",
        diagnosis: "",
        medications: "",
        notes: "",
      });
      setErrors({});
      setSubmitted(true);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to add health record");
    }
  };

  return (
    <div className="healthRecordFormContainer">
      <h2>Add Health Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="InmateName">Inmate Name</label>
          <input
            type="text"
            id="InmateName"
            name="InmateName"
            value={formData.InmateName}
            onChange={handleChange}
          />
          {errors.InmateName && (
            <span className="error">{errors.InmateName}</span>
          )}
        </div>

        <div className="formGroup">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
          {errors.dateOfBirth && (
            <span className="error">{errors.dateOfBirth}</span>
          )}
        </div>

        <div className="formGroup">
          <label htmlFor="diagnosis">Diagnosis</label>
          <input
            type="text"
            id="diagnosis"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="medications">Medications</label>
          <input
            type="text"
            id="medications"
            name="medications"
            value={formData.medications}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="notes">Notes</label>
          <textarea
            className="note"
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            required
          />
        </div>

        <button className="addHealthrecordButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default HealthRecordForm;
