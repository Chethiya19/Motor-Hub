import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
} from 'mdb-react-ui-kit';

function Prediction() {
  const [formData, setFormData] = useState({
    Brand: '',
    Model: '',
    Year: '',
    Condition: '',
    Transmission: '',
    Fuel: '',
    Capacity: '',
    Mileage: ''
  });

  const [predictedPrice, setPredictedPrice] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setPredictedPrice(data.predicted_price);
  };

  return (
    <MDBContainer>
      <MDBRow className="justify-content-center mt-5">
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle className="text-center mb-4">Vehicle Price Prediction</MDBCardTitle>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  label="Brand"
                  name="Brand"
                  value={formData.Brand}
                  onChange={handleChange}
                  className="mb-3"
                />
                <MDBInput
                  label="Model"
                  name="Model"
                  value={formData.Model}
                  onChange={handleChange}
                  className="mb-3"
                />
                <MDBInput
                  label="Year"
                  name="Year"
                  type="number"
                  value={formData.Year}
                  onChange={handleChange}
                  className="mb-3"
                />
                <MDBInput
                  label="Condition"
                  name="Condition"
                  value={formData.Condition}
                  onChange={handleChange}
                  className="mb-3"
                />
                <MDBInput
                  label="Transmission"
                  name="Transmission"
                  value={formData.Transmission}
                  onChange={handleChange}
                  className="mb-3"
                />
                <MDBInput
                  label="Fuel"
                  name="Fuel"
                  value={formData.Fuel}
                  onChange={handleChange}
                  className="mb-3"
                />
                <MDBInput
                  label="Capacity (cc)"
                  name="Capacity"
                  type="number"
                  value={formData.Capacity}
                  onChange={handleChange}
                  className="mb-3"
                />
                <MDBInput
                  label="Mileage (Km)"
                  name="Mileage"
                  type="number"
                  value={formData.Mileage}
                  onChange={handleChange}
                  className="mb-3"
                />
                <MDBBtn type="submit" color="primary" block>
                  Predict Price
                </MDBBtn>
              </form>
              {predictedPrice && (
                <div className="mt-4 text-center">
                  <h4>Predicted Price: Rs {predictedPrice.toFixed(2)}</h4>
                </div>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Prediction;
