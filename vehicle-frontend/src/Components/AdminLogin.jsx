import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace with actual authentication logic
    if (username === 'admin' && password === '123') {
      // Successful login
      window.open('/admin-dashboard', '_blank'); // Open admin panel in a new tab
    } else {
      // Failed login
      setError('Invalid username or password');
    }
  };

  return (
    <MDBContainer fluid style={{ paddingTop: '60px' , paddingBottom: '100px' }}>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12' md='8' lg='6'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '600px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-4 text-center" style={{ fontSize: '2rem' }}>Admin Login</h2>
              <p className="text-dark-50 mb-4 text-center" style={{ fontSize: '1.2rem' }}>Please enter your credentials</p>

              <form onSubmit={handleLogin}>
                <MDBInput 
                  wrapperClass='mb-4 w-100' 
                  label='Username' 
                  id='username' 
                  type='text' 
                  size="lg" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <MDBInput 
                  wrapperClass='mb-4 w-100' 
                  label='Password' 
                  id='password' 
                  type='password' 
                  size="lg" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-danger text-center">{error}</p>}

                <MDBBtn 
                  size='lg' 
                  style={{ backgroundColor: '#007bff', color: '#fff', padding: '0.75rem 1.5rem', fontSize: '1.1rem' }}
                  type='submit'
                >
                  Login
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default AdminLogin;
