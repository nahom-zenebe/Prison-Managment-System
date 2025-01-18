import { Routes, Route } from "react-router-dom";

import Login from "./features/auth/Login";
import Signup from "./features/auth/signup";

import PagenoutFound from './pages/PagenoutFound'

import Staff from "./pages/Staff";
import Welcome from "./features/auth/Welcome";
import AddJailor from "./pages/addJailor";
import JailorList from "./pages/JailorList";
import UpdateJailor from "./components/UpdateJailor";

import CurrentInmates from "./pages/CurrentInmates";
import ReleasedInmates from "./pages/ReleasedInmates";
import WantedInmates from "./pages/WantedInmates";
import HealthcareAppointments from "./pages/HealthcareAppointments";
import InmateSchedule from "./pages/InmateSchedule";
import Dashboard from "./pages/Dashboard";
import AddCurrentInmate from "./pages/AddCurrentInmate";
import AddCurrentAdmission from "./pages/AddCurrentAdmission";

import HealthcareDashboard from "./pages/HealthcareDashboard";
import CurrentAppointments from "./pages/CurrentAppointments";
import ApprovedAppointments from "./pages/ApprovedAppointments";
import AllHealthRecords from "./pages/AllHealthRecords";

import Security from "./components/Add Security/Security";
import Medicine from "./components/Add medicine/Medicine";


import Securityform from "./components/Add Security/Securityform";

import AdminDashboard from "./components/adminDashbord";
import MedicineUpdate from "./components/Add medicine/MedicineUpdate";
import MedicineForm from "./components/Add medicine/MedicineForm";








import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisitorDashboard from "./visitor/VisitorDashboard";
import AllVisitors from "./visitor/AllVisitors";
import AllVisits from "./visit/AllVisits";
import Summrychart from "./visit/Summrychart";







import SecurityDashboard from "./SecurityAndIncident/SecurityDashboard";
import AllSecurityStaff from "./SecurityAndIncident/AllSecurityStaff";
import AllIncident from "./SecurityAndIncident/Incident Management/AllIncident";
import DoctorList from "./pages/DoctorList";

import Home from "./components/Home/Home";


function App() {
  return (
    <div>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="staff" element={<Staff />} />
        <Route path="admindashboard" element={<AdminDashboard />} />
        <Route path="JailorList" element={<JailorList />} />
        <Route path="DoctorList" element={<DoctorList />} />
        <Route path="addjailor" element={<AddJailor />} />
        <Route path="/JailorList/:id" element={<UpdateJailor />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="current" element={<CurrentInmates />} />
        <Route path="/released" element={<ReleasedInmates />} />
        <Route path="/wanted" element={<WantedInmates />} />
        <Route path="/appointments" element={<HealthcareAppointments />} />
        <Route path="/schedule" element={<InmateSchedule />} />
        <Route path="/addCurrent" element={<AddCurrentInmate />} />
        <Route path="/addCurrentAdmission" element={<AddCurrentAdmission />} />

        <Route path="/healthcareDashboard" element={<HealthcareDashboard />} />
        <Route path="/currentAppointments" element={<CurrentAppointments />} />
        <Route
          path="/approvedAppointments"
          element={<ApprovedAppointments />}
        />
        <Route path="/healthRecords" element={<AllHealthRecords />} />

        <Route path="/Security" element={<Security />} />
        <Route path="/mainsecurity" element={<Security />} />
  
        <Route path="/mainmedical" element={<Medicine />} />

      
       
       

        <Route path="/securityform" element={<Securityform />} />

        {/* update part for firearm*/}

       
        <Route path="/medicinepage/:id" element={<MedicineUpdate />} />
        <Route path="/medicineform" element={<MedicineForm />} />
 
      

        {/* visitor management */}
        <Route path="/visitorDashboard" element={<VisitorDashboard />} />
        <Route path="/allVisitors" element={<AllVisitors />} />
        <Route path="/allVisits" element={<AllVisits />} />
        <Route path="/summaryChart" element={<Summrychart />} />

       
        {/* security staff management */}
        <Route path="/securityStaffDashboard" element={<SecurityDashboard />} />
        <Route path="/allSecurityStaff" element={<AllSecurityStaff />} />
        <Route path="/allIncidents" element={<AllIncident />} />

       

        <Route path="/mainhome" element={<Home />} />
        



        <Route path="*" element={<PagenoutFound/>} />

      </Routes>
    </div>
  );
}

export default App;
