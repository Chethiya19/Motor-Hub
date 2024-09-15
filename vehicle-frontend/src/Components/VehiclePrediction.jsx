import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Prediction = () => {
  const [formData, setFormData] = useState({
    Brand: '',
    Model: '',
    Year: '',
    Condition: '',
    Transmission: '',
    Fuel: '',
    'Capacity (cc)': '',
    'Mileage (Km)': '',
  });

  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPredictedPrice(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      setPredictedPrice(response.data.predicted_price);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while predicting the price. Please try again.');
    }
  };

  return (
    <div className="container my-5" style={{ paddingTop: '40px' }} >
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-4">Vehicle Price Prediction</h2>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="Brand" className="form-label">Brand</label>
                      <input
                        type="text"
                        id="Brand"
                        name="Brand"
                        value={formData.Brand}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="Model" className="form-label">Model</label>
                      <input
                        type="text"
                        id="Model"
                        name="Model"
                        value={formData.Model}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="Year" className="form-label">Year</label>
                      <input
                        type="number"
                        id="Year"
                        name="Year"
                        value={formData.Year}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="Condition" className="form-label">Condition</label>
                      <select
                        id="Condition"
                        name="Condition"
                        value={formData.Condition}
                        onChange={handleChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select Condition</option>
                        <option value="New">New</option>
                        <option value="Reconditioned">Reconditioned</option>
                        <option value="Used">Used</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="Transmission" className="form-label">Transmission</label>
                      <select
                        id="Transmission"
                        name="Transmission"
                        value={formData.Transmission}
                        onChange={handleChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select Transmission</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="Tiptronic">Tiptronic</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="Fuel" className="form-label">Fuel</label>
                      <select
                        id="Fuel"
                        name="Fuel"
                        value={formData.Fuel}
                        onChange={handleChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select Fuel</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Petrol">Petrol</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="Capacity (cc)" className="form-label">Capacity (cc)</label>
                      <input
                        type="number"
                        id="Capacity (cc)"
                        name="Capacity (cc)"
                        value={formData['Capacity (cc)']}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="Mileage (Km)" className="form-label">Mileage (Km)</label>
                      <input
                        type="number"
                        id="Mileage (Km)"
                        name="Mileage (Km)"
                        value={formData['Mileage (Km)']}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Predict Price
                </button>
              </form>

              {predictedPrice && (
                <div className="mt-4 alert alert-success">
                  <h4 className="alert-heading">Predicted Price</h4>
                  <p className="mb-0">{predictedPrice}</p>
                </div>
              )}

              {error && (
                <div className="mt-4 alert alert-danger">
                  <h4 className="alert-heading">Error</h4>
                  <p className="mb-0">{error}</p>
                </div>
              )}

              {predictedPrice && (
                <div className="mt-4">
                  <h3 className="text-center mb-4">Prediction Details</h3>
                  <table className="table table-bordered">
                    <thead className="table-primary text-center">
                      <tr>
                        <th>Field</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Brand</td>
                        <td>{formData.Brand}</td>
                      </tr>
                      <tr>
                        <td>Model</td>
                        <td>{formData.Model}</td>
                      </tr>
                      <tr>
                        <td>Year</td>
                        <td>{formData.Year}</td>
                      </tr>
                      <tr>
                        <td>Condition</td>
                        <td>{formData.Condition}</td>
                      </tr>
                      <tr>
                        <td>Transmission</td>
                        <td>{formData.Transmission}</td>
                      </tr>
                      <tr>
                        <td>Fuel</td>
                        <td>{formData.Fuel}</td>
                      </tr>
                      <tr>
                        <td>Capacity (cc)</td>
                        <td>{formData['Capacity (cc)']}</td>
                      </tr>
                      <tr>
                        <td>Mileage (Km)</td>
                        <td>{formData['Mileage (Km)']}</td>
                      </tr>
                      <tr>
                        <td>Predicted Price</td>
                        <td>{predictedPrice}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
