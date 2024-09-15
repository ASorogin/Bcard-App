import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: { first: '', middle: '', last: '' },
    phone: '',
    email: '',
    password: '',
    image: { url: '', alt: '' },
    address: { state: '', country: '', city: '', street: '', houseNumber: '', zip: '' },
    isBusiness: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    let errors = {};
    if (formData.name.first.length < 2 || formData.name.first.length > 256) errors.firstName = "First name must be between 2 and 256 characters";
    if (formData.name.last.length < 2 || formData.name.last.length > 256) errors.lastName = "Last name must be between 2 and 256 characters";
    if (!/^0[2-9]\d{7,8}$/.test(formData.phone)) errors.phone = "Phone must be a valid Israeli phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Email must be valid";
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{9,}$/.test(formData.password)) {
      errors.password = "Password must be at least 9 characters and contain uppercase, lowercase, number and special character";
    }
    if (formData.image.url && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.image.url)) {
        errors.imageUrl = "Image URL must be a valid URL";
    }
    if (formData.address.country.length < 2 || formData.address.country.length > 256) errors.country = "Country must be between 2 and 256 characters";
    if (formData.address.city.length < 2 || formData.address.city.length > 256) errors.city = "City must be between 2 and 256 characters";
    if (formData.address.street.length < 2 || formData.address.street.length > 256) errors.street = "Street must be between 2 and 256 characters";
    if (isNaN(formData.address.houseNumber) || formData.address.houseNumber < 0 || formData.address.houseNumber > 99999999) errors.houseNumber = " number must be between 1 and 99999999";
    if (isNaN(formData.address.zip) || formData.address.zip < 2 || formData.address.zip > 99999999) errors.zip = "Zip must be between 2 and 99999999";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', formData);
        console.log('User registered:', response.data);
        navigate('/login'); // Redirect to login page after successful registration
      } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        setErrors({ submit: 'Registration failed. Please try again.' });
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input type="text" className="form-control" id="firstName" name="name.first" value={formData.name.first} onChange={handleChange} required />
          {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="middleName" className="form-label">Middle Name</label>
          <input type="text" className="form-control" id="middleName" name="name.middle" value={formData.name.middle} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="lastName" name="name.last" value={formData.name.last} onChange={handleChange} required />
          {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          {errors.phone && <div className="text-danger">{errors.phone}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
          {errors.password && <div className="text-danger">{errors.password}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Image URL</label>
          <input type="url" className="form-control" id="imageUrl" name="image.url" value={formData.image.url} onChange={handleChange} />
          {errors.imageUrl && <div className="text-danger">{errors.imageUrl}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="imageAlt" className="form-label">Image Alt Text</label>
          <input type="text" className="form-control" id="imageAlt" name="image.alt" value={formData.image.alt} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">State</label>
          <input type="text" className="form-control" id="state" name="address.state" value={formData.address.state} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country</label>
          <input type="text" className="form-control" id="country" name="address.country" value={formData.address.country} onChange={handleChange} required />
          {errors.country && <div className="text-danger">{errors.country}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input type="text" className="form-control" id="city" name="address.city" value={formData.address.city} onChange={handleChange} required />
          {errors.city && <div className="text-danger">{errors.city}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="street" className="form-label">Street</label>
          <input type="text" className="form-control" id="street" name="address.street" value={formData.address.street} onChange={handleChange} required />
          {errors.street && <div className="text-danger">{errors.street}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="houseNumber" className="form-label">House Number</label>
          <input type="number" className="form-control" id="houseNumber" name="address.houseNumber" value={formData.address.houseNumber} onChange={handleChange} required />
          {errors.houseNumber && <div className="text-danger">{errors.houseNumber}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="zip" className="form-label">Zip Code</label>
          <input type="number" className="form-control" id="zip" name="address.zip" value={formData.address.zip} onChange={handleChange} required />
          {errors.zip && <div className="text-danger">{errors.zip}</div>}
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="isBusiness" name="isBusiness" checked={formData.isBusiness} onChange={(e) => setFormData(prev => ({ ...prev, isBusiness: e.target.checked }))} />
          <label className="form-check-label" htmlFor="isBusiness">Business Account</label>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
        {errors.submit && <div className="text-danger mt-2">{errors.submit}</div>}
      </form>
    </div>
  );
};

export default SignUp;