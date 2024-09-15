import { useState } from 'react';
import PropTypes from 'prop-types';

const AdminEdit = ({ content, onSave }) => {
  const [editedContent, setEditedContent] = useState(content);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedContent);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(editedContent).map(([key, value]) => (
        <div key={key} className="mb-3">
          <label htmlFor={key} className="form-label">{key}</label>
          <input
            type="text"
            className="form-control"
            id={key}
            name={key}
            value={value}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit" className="btn btn-primary">Save Changes</button>
    </form>
  );
};

AdminEdit.propTypes = {
  content: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    mission: PropTypes.string,
    teamPhotoUrl: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AdminEdit;