import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CardDetailsModal from './CardDetailsModal';

const CardDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`);
        setCard(response.data);
        setError(null);
      } catch (err) {
        setError(`Error fetching card details: ${err.message}`);
      }
    };

    fetchCard();
  }, [id]);

  const handleClose = () => {
    navigate('/cards');
  };

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {card ? <CardDetailsModal card={card} onClose={handleClose} /> : <div className="d-flex justify-content-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>}
    </div>
  );
};

export default CardDetailsPage;
