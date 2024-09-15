import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Login from './Components/Login';
import VehicleCrud from './Components/VehicleCrud';
import VehicleAdds from './Components/VehicleAdds';
import VehiclePrediction from './Components/VehiclePrediction';
import AdminLogin from './Components/AdminLogin';
import Register from './Components/Register';
import UserCrud from './Components/UserCrud';
import ImageUpload from './Components/ImageUpload';
import AdminDashboard from './Components/Admin/AdminDashboard';
import ManageUsers from './Components/Admin/ManageUsers';
import ManageVehicles from './Components/Admin/ManageVehicles';
import AdminDashboardLayout from './Components/Admin/AdminDashboardLayout';
import ReportsUpload from './Components/Admin/ReportsUpload'; 
import Settings from './Components/Admin/Settings';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<><Header /><Login /><Footer /></>} />
          <Route path="/VehicleAdds" element={<><Header /><VehicleAdds /><Footer /></>} />
          <Route path="/prediction" element={<><Header /><VehiclePrediction /><Footer /></>} />
          <Route path="/admin-login" element={<><Header /><AdminLogin /><Footer /></>} />
          <Route path="/register" element={<><Header /><Register /><Footer /></>} />
          <Route path="/ImageUpload" element={<><Header /><ImageUpload /><Footer /></>} />
          <Route path="/vehicle" element={<><Header /><VehicleCrud /><Footer /></>} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboardLayout><AdminDashboard /></AdminDashboardLayout>} />
          <Route path="/admin/manage-users" element={<AdminDashboardLayout><ManageUsers /></AdminDashboardLayout>} />
          <Route path="/admin/manage-vehicles" element={<AdminDashboardLayout><ManageVehicles /></AdminDashboardLayout>} />
          <Route path="/admin/reports-upload" element={<AdminDashboardLayout><ReportsUpload /></AdminDashboardLayout>} />
          <Route path="/admin/settings" element={<AdminDashboardLayout><Settings /></AdminDashboardLayout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
