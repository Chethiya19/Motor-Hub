import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';

const VehicleCrud = () => {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    color: '',
    transmission: '',
    fuelType: '',
    image: '',
  });
  const [image, setImage] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [editVehicleId, setEditVehicleId] = useState(null);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSaveVehicle = async (e) => {
    e.preventDefault();

    // Create FormData
    const formData = new FormData();
    formData.append('file', image);
    formData.append('vehicleDTO', JSON.stringify(form));

    try {
      if (editVehicleId) {
        // Update vehicle
        await axios.put(`http://localhost:8080/api/v1/vehicle/updateVehicle/${editVehicleId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Vehicle updated successfully');
      } else {
        // Add new vehicle
        await axios.post('http://localhost:8080/api/v1/vehicle/saveVehicle', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Vehicle added successfully');
      }
      fetchVehicles();
      resetForm();
    } catch (error) {
      console.error('Error saving vehicle:', error);
      setError('Failed to save/update vehicle');
    }
  };

  const handleEdit = (vehicle) => {
    setEditVehicleId(vehicle.VehicleID);
    setForm({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price,
      mileage: vehicle.mileage,
      color: vehicle.color,
      transmission: vehicle.transmission,
      fuelType: vehicle.fuelType,
      image: vehicle.image
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/vehicle/deleteVehicle/${id}`);
      if (response.data.code === '00') {
        fetchVehicles();
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleSearchVehicle = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/vehicle/searchVehicle/${searchId}`);
      if (response.data) {
        setForm(response.data);
      } else {
        alert('No vehicle found with this ID');
      }
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      setError('Failed to fetch vehicle');
    }
  };

  const resetForm = () => {
    setForm({
      make: '',
      model: '',
      year: '',
      price: '',
      mileage: '',
      color: '',
      transmission: '',
      fuelType: '',
      image: '',
    });
    setImage(null);
    setEditVehicleId(null);
  };

  return (
    <div className="container mt-4" style={{ paddingTop: '60px' }}>
      <h2>Vehicle Management</h2>
      <form onSubmit={handleSaveVehicle}>
        <MDBRow className="mb-3">
          <MDBCol md='6'>
            <label className="form-label">Make</label>
            <input type="text" className="form-control" placeholder="Enter vehicle make" name="make" value={form.make} onChange={handleInputChange} required />
          </MDBCol>
          <MDBCol md='6'>
            <label className="form-label">Model</label>
            <input type="text" className="form-control" placeholder="Enter vehicle model" name="model" value={form.model} onChange={handleInputChange} required />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md='6'>
            <label className="form-label">Year</label>
            <input type="number" className="form-control" placeholder="Enter vehicle year" name="year" value={form.year} onChange={handleInputChange} required />
          </MDBCol>
          <MDBCol md='6'>
            <label className="form-label">Price</label>
            <input type="number" className="form-control" placeholder="Enter vehicle price" name="price" value={form.price} onChange={handleInputChange} required />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md='6'>
            <label className="form-label">Mileage</label>
            <input type="number" className="form-control" placeholder="Enter vehicle mileage" name="mileage" value={form.mileage} onChange={handleInputChange} required />
          </MDBCol>
          <MDBCol md='6'>
            <label className="form-label">Color</label>
            <input type="text" className="form-control" placeholder="Enter vehicle color" name="color" value={form.color} onChange={handleInputChange} required />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md='6'>
            <label className="form-label">Transmission</label>
            <input type="text" className="form-control" placeholder="Enter vehicle transmission" name="transmission" value={form.transmission} onChange={handleInputChange} required />
          </MDBCol>
          <MDBCol md='6'>
            <label className="form-label">Fuel Type</label>
            <input type="text" className="form-control" placeholder="Enter vehicle fuel type" name="fuelType" value={form.fuelType} onChange={handleInputChange} required />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3">
          <MDBCol md='12'>
            <label className="form-label">Image</label>
            <input type="file" className="form-control" onChange={handleImageChange} />
          </MDBCol>
        </MDBRow>
        <MDBBtn className='mb-4' size='lg' type='submit'>{editVehicleId ? 'Update' : 'Add'} Vehicle</MDBBtn>
        {error && <p className="text-danger text-center">{error}</p>}
      </form>
      <div className="mt-4 mb-4">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Search Vehicle by ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
          <button className="btn btn-outline-secondary" onClick={handleSearchVehicle}>Search</button>
        </div>
      </div>
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
                <MDBBtn onClick={() => handleEdit(vehicle)} color='warning' size='sm'>Edit</MDBBtn>&nbsp;
                <MDBBtn onClick={() => handleDelete(vehicle.VehicleID)} color='danger' size='sm'>Delete</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
};

export default VehicleCrud;
