import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AdminSidebar.css';

function AdminSidebar() {
  const location = useLocation();

  return (
<div className="admin-sidebar vh-100 d-flex flex-column" style={{ width: '240px' }}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link 
            to="/admin-dashboard" 
            className={`nav-link text-white ${location.pathname === '/admin-dashboard' ? 'active' : ''}`}
          >
            <i className="bi bi-speedometer2 me-2"></i>Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/admin/manage-users" 
            className={`nav-link text-white ${location.pathname === '/admin/manage-users' ? 'active' : ''}`}
          >
            <i className="bi bi-people me-2"></i>Manage Users
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/admin/manage-vehicles" 
            className={`nav-link text-white ${location.pathname === '/admin/manage-vehicles' ? 'active' : ''}`}
          >
            <i className="bi bi-car-front me-2"></i>Manage Vehicles
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/admin/reports-upload" 
            className={`nav-link text-white ${location.pathname === '/admin/reports-upload' ? 'active' : ''}`}
          >
            <i className="bi bi-upload me-2"></i>Upload Reports 
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/admin/settings" 
            className={`nav-link text-white ${location.pathname === '/admin/settings' ? 'active' : ''}`}
          >
            <i className="bi bi-gear me-2"></i>Settings
          </Link>
        </li> 
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <li className="nav-item mt-auto">
          <Link 
            to="/admin-login" 
            className="nav-link text-white"
          >
            <i className="bi bi-box-arrow-right me-2"></i>Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
