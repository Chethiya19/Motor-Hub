import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';

const VehicleAdds = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState('');

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
    }
  };

  const handleCall = (phoneNumber) => {
    // Implement call functionality here
    alert(`Calling ${phoneNumber}`);
  };

  const handleMessage = (phoneNumber) => {
    // Implement message functionality here
    alert(`Messaging ${phoneNumber}`);
  };

  return (
    <div className="container mt-4" style={{ paddingTop: '60px' }}>
      <h2>Vehicle Addvertisments</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <MDBRow>
        {vehicles.map(vehicle => (
          <MDBCol md='4' key={vehicle.VehicleID} className='mb-4'>
            <MDBCard>
              <MDBCardBody>
                {vehicle.image && (
                  <img
                    src={`http://localhost:8080/images/${vehicle.image}`}
                    alt="Vehicle"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    className="img-fluid mb-3"
                  />
                )}
                <MDBCardTitle><strong>{vehicle.make} {vehicle.model}</strong></MDBCardTitle>
                <MDBCardText>
                  <strong>Year:</strong> {vehicle.year}<br />
                  <strong>Price:</strong> Rs {vehicle.price.toLocaleString()}<br />
                  <strong>Mileage:</strong> {vehicle.mileage} Km<br />
                  <strong>Color:</strong> {vehicle.color}<br />
                  <strong>Transmission:</strong> {vehicle.transmission}<br />
                  <strong>Fuel Type:</strong> {vehicle.fuelType}<br />
                  <strong>Posted Date:</strong> {vehicle.postedDate} {/* Display the posted date */}
                </MDBCardText>
                <MDBBtn onClick={() => handleCall(vehicle.phoneNumber)} color='primary' size='sm'>Call</MDBBtn>&nbsp;
                <MDBBtn onClick={() => handleMessage(vehicle.phoneNumber)} color='secondary' size='sm'>Message</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
};

export default VehicleAdds;
