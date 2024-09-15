import { useState, useEffect } from 'react';
import axios from 'axios';
import CardItem from '../components/CardItem';

const MyCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyCards = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards', {
          headers: { 'x-auth-token': token }
        });
        setCards(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching my cards:', err);
        setError('Failed to fetch your cards. Please try again later.');
        setLoading(false);
      }
    };

    fetchMyCards();
  }, []);

  const handleDeleteCard = async (cardId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
        headers: { 'x-auth-token': token }
      });
      setCards(cards.filter(card => card._id !== cardId));
    } catch (err) {
      console.error('Error deleting card:', err);
      setError('Failed to delete the card. Please try again.');
    }
  };

  const handleCardClick = (card) => {
    // You can add logic here if needed, e.g., navigate to a detailed view
    console.log('Card clicked:', card);
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger mt-3" role="alert">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Cards</h2>
      {cards.length === 0 ? (
        <p>You havent created any cards yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {cards.map(card => (
            <div key={card._id} className="col">
              <CardItem 
                card={card}
                onDelete={() => handleDeleteCard(card._id)}
                onCardClick={() => handleCardClick(card)}
                showEditDelete={true}
                isOwnCard={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCards;