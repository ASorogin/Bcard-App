import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch, onClear, searchId, setSearchId }) => {
  const [hasSearched, setHasSearched] = useState(false); // Track if a search has been performed

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch();
    setHasSearched(true); // Set the state to true when search is performed
  };

  const handleClear = () => {
    onClear();
    setHasSearched(false); // Reset the search status when clearing
  };

  return (
    <form className="mb-4" onSubmit={handleSearch}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search card by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Search</button>
      </div>
      {hasSearched && (
        <button className="btn btn-secondary mt-2" onClick={handleClear}>
          Clear
        </button>
      )}
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  searchId: PropTypes.string.isRequired,
  setSearchId: PropTypes.func.isRequired,
};

export default SearchBar;
