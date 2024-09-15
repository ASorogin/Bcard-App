import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const AdminSandbox = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || !user?.isAdmin) {
      navigate('/');
      return;
    }
  }, [isLoggedIn, user, navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${searchQuery}`,
        { headers: { 'x-auth-token': token } }
      );
      setSearchedUser(response.data);
    } catch (err) {
      console.error('Error fetching user:', err);
      setError('User not found or failed to fetch. Please try again.');
    }
    setLoading(false);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`, {
          headers: { 'x-auth-token': token }
        });
        setSearchedUser(null); // Clear the searched user after deletion
      } catch (err) {
        console.error('Error deleting user:', err);
        setError('Failed to delete user. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Sandbox</h2>

      <form onSubmit={handleSearch} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search user by ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}

      {searchedUser && (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{searchedUser.name.first} {searchedUser.name.last}</td>
              <td>{searchedUser.email}</td>
              <td>{searchedUser.phone}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteUser(searchedUser._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminSandbox;
