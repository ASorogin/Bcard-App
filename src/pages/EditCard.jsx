import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const EditCard = () => {
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
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, {
          headers: { 'x-auth-token': token }
        });
        // Remove the _id field from the image object without creating an unused variable
        const { image, ...restData } = response.data;
        const imageWithoutId = { url: image.url, alt: image.alt };
        setFormData({ ...restData, image: imageWithoutId });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching card:', err);
        setError('Failed to fetch card data. Please try again later.');
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

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
      setError('You must be logged in to edit a card.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        {
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
            houseNumber: Number(formData.address.houseNumber),
            zip: Number(formData.address.zip)
          }
        },
        { 
          headers: { 
            'x-auth-token': token,
            'Content-Type': 'application/json'
          } 
        }
      );
      console.log('Card updated:', response.data);
      navigate('/my-cards');
    } catch (error) {
      console.error('Error updating card:', error.response?.data || error.message);
      if (error.response?.status === 400) {
        setError('Invalid input. Please check all fields and try again.');
      } else if (error.response?.status === 401) {
        setError('Unauthorized. Please log in again.');
      } else if (error.response?.status === 403) {
        setError('You do not have permission to edit this card.');
      } else {
        setError('An error occurred while updating the card. Please try again later.');
      }
    }
  };

  const handleImageError = (e) => {
    const placeholderImage = '/path/to/placeholder-image.jpg'; // Replace with your placeholder image path
    e.target.src = placeholderImage;
    setFormData(prev => ({
      ...prev,
      image: {
        ...prev.image,
        url: placeholderImage
      }
    }));
  };

  if (!isLoggedIn) {
    return <div className="alert alert-warning">Please log in to edit this card.</div>;
  }

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-3" role="alert">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Edit Business Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="subtitle" className="form-label">Subtitle</label>
          <input type="text" className="form-control" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="web" className="form-label">Website</label>
          <input type="url" className="form-control" id="web" name="web" value={formData.web} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="image.url" className="form-label">Image URL</label>
          <input type="url" className="form-control" id="image.url" name="image.url" value={formData.image.url} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="image.alt" className="form-label">Image Alt Text</label>
          <input type="text" className="form-control" id="image.alt" name="image.alt" value={formData.image.alt} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <img src={formData.image.url} alt={formData.image.alt} onError={handleImageError} style={{maxWidth: '200px', maxHeight: '200px'}} />
        </div>
        <div className="mb-3">
          <label htmlFor="address.country" className="form-label">Country</label>
          <input type="text" className="form-control" id="address.country" name="address.country" value={formData.address.country} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="address.state" className="form-label">State</label>
          <input type="text" className="form-control" id="address.state" name="address.state" value={formData.address.state} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="address.city" className="form-label">City</label>
          <input type="text" className="form-control" id="address.city" name="address.city" value={formData.address.city} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="address.street" className="form-label">Street</label>
          <input type="text" className="form-control" id="address.street" name="address.street" value={formData.address.street} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="address.houseNumber" className="form-label">House Number</label>
          <input type="number" className="form-control" id="address.houseNumber" name="address.houseNumber" value={formData.address.houseNumber} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="address.zip" className="form-label">ZIP Code</label>
          <input type="text" className="form-control" id="address.zip" name="address.zip" value={formData.address.zip} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update Card</button>
      </form>
    </div>
  );
};

export default EditCard;