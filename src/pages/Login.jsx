import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Make sure this path is correct

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{9,20}$/.test(formData.password)) {
      errors.password = "Password must be 9-20 characters and include uppercase, lowercase, number and special character";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login', formData);
        const token = response.data;
        
        // Use the login function from AuthContext
        login(token);

        navigate('/cards'); // Redirect to home page or dashboard
      } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        setErrors({ submit: 'Invalid email or password' });
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className="text-danger">{errors.password}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        {errors.submit && <div className="text-danger mt-2">{errors.submit}</div>}
      </form>
    </div>
  );
};

export default Login;