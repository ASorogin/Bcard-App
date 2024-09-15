import PropTypes from 'prop-types';

const CardDetailsModal = ({ card, onClose }) => {
  if (!card) return null;

  // Construct the Google Maps Embed URL
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCtHb0cLjv81YSjO0t6B3HRhU9J7Kyg5kg&q=${encodeURIComponent(
    `${card.address.street} ${card.address.houseNumber}, ${card.address.city}, ${card.address.country}`
  )}`;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{card.title}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <img src={card.image.url} className="img-fluid mb-3" alt={card.image.alt} />
            <h6>{card.subtitle}</h6>
            <p>{card.description}</p>
            <p>Phone: {card.phone}</p>
            <p>Email: {card.email}</p>
            {card.web && <p>Website: <a href={card.web} target="_blank" rel="noopener noreferrer">{card.web}</a></p>}
            <p>Address: {card.address.street} {card.address.houseNumber}, {card.address.city}, {card.address.country}</p>
            <p>Card Number: {card.bizNumber}</p>
            
            {/* Google Maps Embed */}
            <div className="mt-3">
              <iframe
                title="map"
                width="100%"
                height="300"
                frameBorder="0"
                style={{ border: 0 }}
                src={googleMapsUrl}
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

CardDetailsModal.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    web: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      houseNumber: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string,
    }).isRequired,
    bizNumber: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default CardDetailsModal;
