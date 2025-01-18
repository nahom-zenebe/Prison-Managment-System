import React, { useEffect, useState } from "react";
import Sidebar from "../visitor/Sidebar";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import ConfirmationModal from "../conformation/ConfirmationModal";
import { toast } from "react-toastify";
import "../visitor/CssFiles/AllTables.css";

const AllVisits = () => {
  const [visits, setVisitData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deletingVisitId, setDeletingVisitId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getAllVisits = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:3500/api/visit");
      setVisitData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching visits:", error);
      toast.error("Failed to fetch visit data.", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsLoading(false);
    }
  };

  const handleDelete = (id) => {
    setDeletingVisitId(id);
    setShowConfirmationModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3500/api/visit/delete/${deletingVisitId}`
      );
      setVisitData((prevVisits) =>
        prevVisits.filter((visit) => visit._id !== deletingVisitId)
      );
      toast.success("Visit successfully deleted.", {
        position: "top-right",
        autoClose: 3000,
      });
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Error deleting visit:", error);
      toast.error("Failed to delete visit.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    getAllVisits();
  }, []);

  const filteredVisits = visits.filter(
    (visit) =>
      visit.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.nic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.inmateNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="v-home">
      <div className="v-container">
        <Sidebar />
        <div className="v-main-content">
          <h1 className="v-page-title">All Tracking Details</h1>
          <div className="v-flex-container">
            <div className="v-search-container">
              <input
                className="v-input-field"
                type="text"
                placeholder="Search Visits"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="v-table-container">
            {isLoading ? (
              <p>Loading visits...</p>
            ) : filteredVisits.length > 0 ? (
              <table className="v-custom-table">
                <thead>
                  <tr>
                    <th>Visitor Name</th>
                    <th>NIC</th>
                    <th>Inmate Number</th>
                    <th>Date of Visit</th>
                    <th>Check-in Time</th>
                    <th>Check-out Time</th>
                    <th>Duration (mins)</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisits.map((visit) => (
                    <tr key={visit._id}>
                      <td>{visit.visitorName}</td>
                      <td>{visit.nic}</td>
                      <td>{visit.inmateNo}</td>
                      <td>
                        {new Date(visit.dateOfVisit).toLocaleDateString()}
                      </td>
                      <td>{visit.checkInTime}</td>
                      <td>{visit.checkOutTime}</td>
                      <td>{visit.duration}</td>
                      <td>
                        <button
                          aria-label="Delete Visit"
                          onClick={() => handleDelete(visit._id)}
                        >
                          <MdDeleteOutline color="red" size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No visits to display.</p>
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete?"
      />
    </div>
  );
};

export default AllVisits;
