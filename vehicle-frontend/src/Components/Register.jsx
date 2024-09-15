import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; // Import MDB CSS

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/register', user);
      if (response.status === 201) {
        setMessage({ text: 'Customer registered successfully', type: 'success' });
        setUser({ name: '', email: '', password: '', contact: '' });
      } else if (response.status === 409) {
        setMessage({ text: 'Email already exists', type: 'error' });
      } else {
        setMessage({ text: response.data.message || 'Registration failed', type: 'error' });
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage({ text: 'Email already exists', type: 'error' });
      } else {
        setMessage({ text: 'Error registering user', type: 'error' });
      }
    }
  };

  return (
    <MDBContainer fluid style={{ paddingTop: '40px', paddingBottom: '50px' }}>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>

              <form onSubmit={handleSubmit} className="w-100">
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size='lg'/>
                  <MDBInput 
                    label='Name' 
                    id='name' 
                    type='text' 
                    name='name'
                    value={user.name}
                    onChange={handleChange}
                    className='w-100'
                    required
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg'/>
                  <MDBInput 
                    label='Email' 
                    id='email' 
                    type='email' 
                    name='email'
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg'/>
                  <MDBInput 
                    label='Password' 
                    id='password' 
                    type='password' 
                    name='password'
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="phone me-3" size='lg'/>
                  <MDBInput 
                    label='Contact' 
                    id='contact' 
                    type='text' 
                    name='contact'
                    value={user.contact}
                    onChange={handleChange}
                    required
                  />
                </div>

                <MDBBtn className='mb-4' size='lg' type='submit'>Register</MDBBtn>
                
                {message.text && (
                  <div style={{
                    backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: message.type === 'success' ? '#155724' : '#721c24',
                    border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                    borderRadius: '5px',
                    padding: '10px',
                    margin: '10px 0',
                    textAlign: 'center'
                  }}>
                    {message.text}
                  </div>
                )}
              </form>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <img 
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' 
                alt='Registration Illustration'
                className='img-fluid'
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Register;
