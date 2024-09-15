import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import CardItem from '../components/CardItem';

const MyLikedCards = () => {
  const [likedCards, setLikedCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchLikedCards = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found. Please log in.');
          setLoading(false);
          return;
        }

        const decodedToken = jwtDecode(token);
        const currentUserId = decodedToken._id;
        setUserId(currentUserId);

        const response = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards', {
          headers: { 'x-auth-token': token }
        });

        setLikedCards(response.data.filter(card => card.likes && card.likes.includes(currentUserId)));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching liked cards:', err);
        setError('Failed to fetch liked cards. Please try again later.');
        setLoading(false);
      }
    };

    fetchLikedCards();
  }, []);

  const handleUnlike = async (cardId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {}, {
        headers: { 'x-auth-token': token }
      });
      
      setLikedCards(prevCards => 
        prevCards.map(card => 
          card._id === cardId
            ? { ...card, likes: card.likes.filter(id => id !== userId) }
            : card
        ).filter(card => card.likes.includes(userId))
      );
    } catch (err) {
      console.error('Error unliking card:', err);
      setError('Failed to unlike the card. Please try again.');
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger mt-3" role="alert">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Liked Cards</h2>
      {likedCards.length === 0 ? (
        <p>You havent liked any cards yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {likedCards.map(card => (
            <div key={card._id} className="col">
              <CardItem 
                card={card}
                onLike={handleUnlike}
                isLiked={true}
                isOwnCard={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLikedCards;