import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardTitle,
  MDBCardText
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; // Import MDB CSS

const VehicleCrud = () => {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    make: '', model: '', year: '', price: '',
    mileage: '', color: '', transmission: '', fuelType: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/vehicle/getAllVehicles');
      if (response.data.code === '00') {
        setVehicles(response.data.content);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editMode) {
        response = await axios.put('http://localhost:8080/api/v1/vehicle/updateVehicle', { ...form, vehicleID: editId });
      } else {
        response = await axios.post('http://localhost:8080/api/v1/vehicle/saveVehicle', form);
      }

      if (response.data.code === '00') {
        setForm({
          make: '', model: '', year: '', price: '',
          mileage: '', color: '', transmission: '', fuelType: ''
        });
        setEditMode(false);
        setEditId(null);
        fetchVehicles();
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form');
    }
  };

  const handleEdit = (vehicle) => {
    setForm({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price,
      mileage: vehicle.mileage,
      color: vehicle.color,
      transmission: vehicle.transmission,
      fuelType: vehicle.fuelType
    });
    setEditMode(true);
    setEditId(vehicle.vehicleID);
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

  return (
    <MDBContainer fluid style={{ paddingTop: '40px' }}>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow className='d-flex justify-content-center'>
            <MDBCol md='10' lg='8' className='d-flex flex-column align-items-center mb-4'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Vehicle Management</p>

              <form onSubmit={handleSubmit} className="w-100">
                <MDBRow>
                  <MDBCol md='6'>
                    <div className="mb-4">
                      <MDBInput 
                        label='Make' 
                        id='form1' 
                        type='text' 
                        name='make'
                        value={form.make}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <MDBInput 
                        label='Model' 
                        id='form2' 
                        type='text' 
                        name='model'
                        value={form.model}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <MDBInput 
                        label='Year' 
                        id='form3' 
                        type='number' 
                        name='year'
                        value={form.year}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <MDBInput 
                        label='Price (Rs)' 
                        id='form4' 
                        type='number' 
                        name='price'
                        value={form.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </MDBCol>

                  <MDBCol md='6'>
                    <div className="mb-4">
                      <MDBInput 
                        label='Mileage (Km)' 
                        id='form5' 
                        type='number' 
                        name='mileage'
                        value={form.mileage}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <MDBInput 
                        label='Color' 
                        id='form6' 
                        type='text' 
                        name='color'
                        value={form.color}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <MDBInput 
                        label='Transmission' 
                        id='form7' 
                        type='text' 
                        name='transmission'
                        value={form.transmission}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <MDBInput 
                        label='Fuel Type' 
                        id='form8' 
                        type='text' 
                        name='fuelType'
                        value={form.fuelType}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBBtn className='mb-4' size='lg' type='submit'>{editMode ? 'Update' : 'Add'} Vehicle</MDBBtn>
                {error && <p className="text-danger text-center">{error}</p>}
              </form>
            </MDBCol>

            <MDBCol md='12'>
              <MDBRow>
                {vehicles.map(vehicle => (
                  <MDBCol md='4' key={vehicle.vehicleID} className='mb-4'>
                    <MDBCard>
                      <MDBCardBody>
                        <MDBCardTitle>{vehicle.make} {vehicle.model}</MDBCardTitle>
                        <MDBCardText>
                          <strong>Year:</strong> {vehicle.year}<br />
                          <strong>Price:</strong> Rs {vehicle.price.toLocaleString()}<br />
                          <strong>Mileage:</strong> {vehicle.mileage} Km<br />
                          <strong>Color:</strong> {vehicle.color}<br />
                          <strong>Transmission:</strong> {vehicle.transmission}<br />
                          <strong>Fuel Type:</strong> {vehicle.fuelType}
                        </MDBCardText>
                        <MDBBtn onClick={() => handleEdit(vehicle)} color='warning' size='sm'>Edit</MDBBtn>&nbsp;
                        <MDBBtn onClick={() => handleDelete(vehicle.vehicleID)} color='danger' size='sm'>Delete</MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                ))}
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default VehicleCrud;
