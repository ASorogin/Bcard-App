import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CardItem.css';

const CardItem = ({ card, onDelete, onLike, showEditDelete, isLiked, onCardClick, isOwnCard }) => {
  const handleClick = () => {
    if (onCardClick) {
      onCardClick(card);
    }
  };

  const handleLikeUnlike = (e) => {
    e.stopPropagation();
    onLike(card._id);
  };

  return (
    <div className={`card h-100 ${isLiked ? 'card-liked' : ''}`} onClick={handleClick}>
      <img src={card.image.url} className="card-img-top" alt={card.image.alt} style={{height: '200px', objectFit: 'cover'}} />
      <div className="card-body">
        <h5 className="card-title">{card.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{card.subtitle}</h6>
        <p className="card-text">{card.description}</p>
        <p className="card-text">Phone: {card.phone}</p>
        <p className="card-text">Address: {card.address.street} {card.address.houseNumber}, {card.address.city}</p>
        <p className="card-text">Card Number: {card.bizNumber}</p>
        <p className="card-text">
          <strong>Likes: </strong>
          {card.likes ? card.likes.length : 0}
        </p>
      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <div>
          {showEditDelete && (
            <>
              <Link to={`/edit-card/${card._id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
              <button onClick={(e) => { e.stopPropagation(); onDelete(card._id); }} className="btn btn-danger btn-sm me-2">Delete</button>
            </>
          )}
        </div>
        <div>
          {!isOwnCard && (
            <button onClick={handleLikeUnlike} className={`btn btn-sm ${isLiked ? 'btn-warning' : 'btn-success'}`}>
              {isLiked ? 'Unlike' : 'Like'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

CardItem.propTypes = {
  card: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    phone: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      houseNumber: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
    bizNumber: PropTypes.number.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onDelete: PropTypes.func,
  onLike: PropTypes.func,
  showEditDelete: PropTypes.bool,
  isLiked: PropTypes.bool,
  onCardClick: PropTypes.func,
  isOwnCard: PropTypes.bool,
};

export default CardItem;