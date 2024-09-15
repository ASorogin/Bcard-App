import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/useAuth';

const EditableContent = ({ id, defaultContent, type = 'text' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(defaultContent);
  const { user } = useAuth();

  useEffect(() => {
    const savedContent = localStorage.getItem(id);
    if (savedContent) {
      setContent(savedContent);
    }
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    localStorage.setItem(id, content);
    setIsEditing(false);
  };

  if (!user?.isAdmin) {
    return type === 'text' ? <p>{content}</p> : <h2>{content}</h2>;
  }

  if (isEditing) {
    return (
      <div>
        {type === 'text' ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        ) : (
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        )}
        <button onClick={handleSave} className="btn btn-primary mt-2">Save</button>
      </div>
    );
  }

  return (
    <div>
      {type === 'text' ? <p>{content}</p> : <h2>{content}</h2>}
      <button onClick={handleEdit} className="btn btn-secondary btn-sm">Edit</button>
    </div>
  );
};

EditableContent.propTypes = {
  id: PropTypes.string.isRequired,
  defaultContent: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'heading'])
};

EditableContent.defaultProps = {
  type: 'text'
};

export default EditableContent;