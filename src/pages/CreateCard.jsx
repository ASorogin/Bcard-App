import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const CreateCard = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    phone: '',
    email: '',
    web: '',
    image: { url: '', alt: '' },
    address: { state: '', country: '', city: '', street: '', houseNumber: '', zip: '' }
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError('You must be logged in to create a card.');
      return;
    }

    const cardData = {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      phone: formData.phone,
      email: formData.email,
      web: formData.web,
      image: {
        url: formData.image.url,
        alt: formData.image.alt
      },
      address: {
        state: formData.address.state,
        country: formData.address.country,
        city: formData.address.city,
        street: formData.address.street,
        houseNumber: parseInt(formData.address.houseNumber, 10),
        zip: parseInt(formData.address.zip, 10)
      }
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards',
        cardData,
        { 
          headers: { 
            'x-auth-token': token,
            'Content-Type': 'application/json'
          } 
        }
      );
      console.log('Card created:', response.data);
      navigate('/cards'); // Redirect to cards page after successful creation
    } catch (error) {
      console.error('Error creating card:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred while creating the card.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Business Card</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required minLength="2" maxLength="256" />
        </div>
        <div className="mb-3">
          <label htmlFor="subtitle" className="form-label">Subtitle</label>
          <input type="text" className="form-control" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} required minLength="2" maxLength="256" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required minLength="2" maxLength="1024" />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="web" className="form-label">Website</label>
          <input type="url" className="form-control" id="web" name="web" value={formData.web} onChange={handleChange} minLength="10" />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Image URL</label>
          <input type="url" className="form-control" id="imageUrl" name="image.url" value={formData.image.url} onChange={handleChange} required minLength="10" />
        </div>
        <div className="mb-3">
          <label htmlFor="imageAlt" className="form-label">Image Alt Text</label>
          <input type="text" className="form-control" id="imageAlt" name="image.alt" value={formData.image.alt} onChange={handleChange} required minLength="2" maxLength="256" />
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">State</label>
          <input type="text" className="form-control" id="state" name="address.state" value={formData.address.state} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country</label>
          <input type="text" className="form-control" id="country" name="address.country" value={formData.address.country} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input type="text" className="form-control" id="city" name="address.city" value={formData.address.city} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="street" className="form-label">Street</label>
          <input type="text" className="form-control" id="street" name="address.street" value={formData.address.street} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="houseNumber" className="form-label">House Number</label>
          <input type="number" className="form-control" id="houseNumber" name="address.houseNumber" value={formData.address.houseNumber} onChange={handleChange} required min="1" />
        </div>
        <div className="mb-3">
          <label htmlFor="zip" className="form-label">ZIP Code</label>
          <input type="number" className="form-control" id="zip" name="address.zip" value={formData.address.zip} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Create Card</button>
      </form>
    </div>
  );
};

export default CreateCard;