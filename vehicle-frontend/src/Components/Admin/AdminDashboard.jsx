import React from 'react';
import AdminHeader from './AdminHeader';
import Sidebar from './AdminSidebar';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure Font Awesome CSS is included

function AdminDashboard() {
  // Dummy data for counts; replace these with actual data from your state or API
  const userCount = 5;
  const vehicleCount = 13;
  const adCount = 10;

  return (
    <div>
      <AdminHeader />
      <div style={{ marginLeft: '240px', marginTop: '50px' }}>
        <Sidebar />
        <main className="container">
          <h1>Admin Dashboard</h1>
          <p>Welcome to the Admin Dashboard. Use the navigation menu to manage users and vehicles.</p>
          <div className="row my-4">
            {/* User Count Card */}
            <div className="col-md-4">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle>
                    <i className="fas fa-users me-2"></i>User Count
                  </MDBCardTitle>
                  <MDBCardText>
                    {userCount}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>
            {/* Vehicle Count Card */}
            <div className="col-md-4">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle>
                    <i className="fas fa-car me-2"></i>Vehicle Count
                  </MDBCardTitle>
                  <MDBCardText>
                    {vehicleCount}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>
            {/* Ads Count Card */}
            <div className="col-md-4">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle>
                    <i className="fas fa-ad me-2"></i>Ads Count
                  </MDBCardTitle>
                  <MDBCardText>
                    {adCount}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
