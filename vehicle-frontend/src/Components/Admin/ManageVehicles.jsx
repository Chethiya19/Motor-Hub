import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import Sidebar from './AdminSidebar';
import { MDBSpinner, MDBBtn } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/vehicle/getAllVehicles');
      setVehicles(response.data.content || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setError('Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (id) => {
    // Logic for approving the vehicle
    console.log('Approve vehicle with ID:', id);
    // You might want to call an API to update the vehicle status here
  };

  return (
    <div><AdminHeader />
    <div style={{ marginLeft: '240px', marginTop: '50px' }}>
      <Sidebar />
      <main className="container">
        <h1 className="my-4">Manage Vehicles</h1>
        {loading ? (
          <div className="d-flex justify-content-center">
            <MDBSpinner>
              <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
          </div>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  {/* <th>Order</th> */}
                  <th>ID</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Price</th>
                  <th>Mileage</th>
                  <th>Color</th>
                  <th>Transmission</th>
                  <th>Fuel Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle, index) => (
                  <tr key={vehicle.id}>
                    <td>{index + 1}</td> {/* Displaying order from 1 upwards */}
                    {/* <td>{vehicle.id}</td> */}
                    <td>{vehicle.make}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.year}</td>
                    <td>Rs. {vehicle.price}</td> {/* Updated to include RS */}
                    <td>{vehicle.mileage} Km</td>
                    <td>{vehicle.color}</td>
                    <td>{vehicle.transmission}</td>
                    <td>{vehicle.fuelType}</td>
                    <td>
                      <MDBBtn color="success" onClick={() => handleApprove(vehicle.id)}>Approve</MDBBtn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div></div>
  );
};

export default ManageVehicles;
