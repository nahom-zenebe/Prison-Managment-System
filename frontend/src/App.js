import { Routes, Route } from "react-router-dom";

import Login from "./features/auth/Login";
import Signup from "./features/auth/signup";

import PagenoutFound from './pages/PagenoutFound'
import { useAuth } from "./hooks/customhook";
import ProtectedRoute from './components/ProtectedRoute'
import LearnMore from './pages/LearnMore'
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
        <Route path="LearnMore" element={<LearnMore />} />
 
        <Route path="staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
        <Route path="admindashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="JailorList" element={<ProtectedRoute><JailorList /></ProtectedRoute>} />
        <Route path="DoctorList" element={<ProtectedRoute><DoctorList /></ProtectedRoute>} />
        <Route path="addjailor" element={<ProtectedRoute><AddJailor /></ProtectedRoute>} />
        <Route path="/JailorList/:id" element={<ProtectedRoute><UpdateJailor /></ProtectedRoute>} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="current" element={<ProtectedRoute><CurrentInmates /></ProtectedRoute>} />
        <Route path="/released" element={<ProtectedRoute><ReleasedInmates /></ProtectedRoute>} />
        <Route path="/wanted" element={<ProtectedRoute><WantedInmates /></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute><HealthcareAppointments /></ProtectedRoute>} />
        <Route path="/schedule" element={<ProtectedRoute><InmateSchedule /></ProtectedRoute>} />
        <Route path="/addCurrent" element={<ProtectedRoute><AddCurrentInmate /></ProtectedRoute>} />
        <Route path="/addCurrentAdmission" element={<ProtectedRoute><AddCurrentAdmission /></ProtectedRoute>} />

        <Route path="/healthcareDashboard" element={<ProtectedRoute><HealthcareDashboard /></ProtectedRoute>} />
        <Route path="/currentAppointments" element={<ProtectedRoute><CurrentAppointments /></ProtectedRoute>} />
        <Route
          path="/approvedAppointments"
          element={<ProtectedRoute><ApprovedAppointments /></ProtectedRoute>}
        />
        <Route path="/healthRecords" element={<ProtectedRoute><AllHealthRecords /></ProtectedRoute>} />

        <Route path="/Security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
        <Route path="/mainsecurity" element={<ProtectedRoute><Security /></ProtectedRoute>} />
  
        <Route path="/mainmedical" element={<ProtectedRoute><Medicine /></ProtectedRoute>} />

      
       
       

        <Route path="/securityform" element={<ProtectedRoute><Securityform /></ProtectedRoute>} />

        {/* update part for firearm*/}

       
        <Route path="/medicinepage/:id" element={<ProtectedRoute><MedicineUpdate /></ProtectedRoute>} />
        <Route path="/medicineform" element={<ProtectedRoute><MedicineForm /></ProtectedRoute>} />
 
      

        {/* visitor management */}
        <Route path="/visitorDashboard" element={<ProtectedRoute><VisitorDashboard /></ProtectedRoute>} />
        <Route path="/allVisitors" element={<ProtectedRoute><AllVisitors /></ProtectedRoute>} />
        <Route path="/allVisits" element={<ProtectedRoute><AllVisits /></ProtectedRoute>} />
        <Route path="/summaryChart" element={<ProtectedRoute><Summrychart /></ProtectedRoute>} />

       
        {/* security staff management */}
        <Route path="/securityStaffDashboard" element={<ProtectedRoute><SecurityDashboard /></ProtectedRoute>} />
        <Route path="/allSecurityStaff" element={<ProtectedRoute><AllSecurityStaff /></ProtectedRoute>} />
        <Route path="/allIncidents" element={<ProtectedRoute><AllIncident /></ProtectedRoute>} />

       

        <Route path="/mainhome" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        



        <Route path="*" element={<PagenoutFound/>} />

      </Routes>
    </div>
  );
}

export default App;
