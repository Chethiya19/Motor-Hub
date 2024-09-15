import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardHeader,
  MDBCardText
} from 'mdb-react-ui-kit';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        setMessage('Login successful');
        alert('Login successful'); // Alert the user
        navigate('/vehicle'); // Redirect to dashboard
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage('Invalid credentials');
      } else {
        setMessage('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5" style={{ marginTop: '30px' }}>
      <MDBRow className="align-items-center justify-content-center">
        <MDBCol col='12' md='5' className="d-flex justify-content-center">
          <img 
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" 
            className="img-fluid" 
            alt="Login Illustration" 
            style={{ maxWidth: '90%' }} // Adjust image size
          />
        </MDBCol>
        <MDBCol col='12' md='7'>
          <MDBCard style={{ maxWidth: '400px', margin: 'auto' }}> {/* Decrease form size */}
            <MDBCardHeader className="text-center">
              <MDBCardTitle>Login</MDBCardTitle>
            </MDBCardHeader>
            <MDBCardBody>
              <form onSubmit={handleLogin}>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Email address'
                  id='email'
                  type='email'
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  id='password'
                  type='password'
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="d-flex justify-content-between mx-4 mb-4">
                  <a href="#!">Forgot password?</a>
                </div>
                <MDBBtn 
                  type="submit" 
                  className="mb-4 w-100" 
                  size="lg" 
                  color="primary"
                >
                  {loading ? 'Logging in...' : 'Sign in'}
                </MDBBtn>
                {message && (
                  <MDBCardText className="text-center mt-3" style={{ color: message === 'Login successful' ? 'green' : 'red' }}>
                    {message}
                  </MDBCardText>
                )}
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0" style={{ flex: 1 }}>OR</p> {/* Center OR text */}
                </div>
                <MDBBtn 
                  className="mb-4 w-100" 
                  size="lg" 
                  style={{backgroundColor: '#3b5998'}}
                >
                  <MDBIcon fab icon="facebook-f" className="mx-2"/>
                  Continue with Facebook
                </MDBBtn>
                <MDBBtn 
                  className="mb-4 w-100" 
                  size="lg" 
                  style={{backgroundColor: '#db4437'}} // Google color
                >
                  <MDBIcon fab icon="google" className="mx-2"/>
                  Continue with Google
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
