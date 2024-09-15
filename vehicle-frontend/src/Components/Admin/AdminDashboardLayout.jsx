import React from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import './AdminDashboardLayout.css'; 

function AdminDashboardLayout({ children }) {
  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <div className="admin-body">
        <AdminSidebar />
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
