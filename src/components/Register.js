import React, { useState , useEffect } from 'react';
// import Spinner from './Spinner';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
const Register = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    // const [Loading, setLoading] = useState();
    const [formData, setFormData] = useState({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
  });


  useEffect(() => {
    // Fetch countries from REST API
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/location/countries'); 
        // setLoading(true);
        const countryList = response.data.map((country) => ({
          name: country.name,
          code: country.code,
        }));
      
        setCountries(countryList);
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
        // setLoading(false);
      }
    };

    fetchCountries();
  }, []);
  useEffect (()=>{
        const fetchState = async()=>{
            try{
              // const response = await axios.get('http://localhost:5000/api/location/states/' +  selectedOption); 
              const response = await axios.post('https://countriesnow.space/api/v0.1/countries/states', {
                country: selectedOption,
              });
              // const stateList = response.data.map((state) => ({
              //   name: state.name,
              //   code: state.code,
              // }));
              // setStates(stateList);
            }catch(error){
              console.log('Error fetching states:' , error)
            }
        }
        fetchState();
  } , []);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setSelectedOption(e.target.value)
    
    setFormData({ 
      ...formData, 
      
      [e.target.name]: e.target.value 
    });
  };

  console.log('stateList', states , selectedOption);

  const validateForm = () => {
    let formErrors = {};
    if (!formData.username) formErrors.username = 'Username is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.password) formErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      // Handle registration logic here
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card shadow-lg" style={{ width: '400px', padding: '20px', borderRadius: '12px' }}>
        <h3 className="text-center mb-4">Register</h3>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input 
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>

          {/* Country */}
          <div className="mb-3">
            <label className="form-label">Country</label>
            
              <select 
                name="country" 
                className="form-select" 
                value={formData.country} 
                onChange={handleChange} 
                required
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            
          </div>
          {/* States */}
          <div className="mb-3">
            <label className="form-label">States</label>
            
              <select 
                name="state" 
                className="form-select" 
                value={formData.state} 
                onChange={handleChange} 
                required
              >
                <option value="">Select a state</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            
          </div>


          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input 
              type="password"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
