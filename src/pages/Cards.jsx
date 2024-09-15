import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import CardItem from '../components/CardItem';
import CardDetailsModal from '../pages/CardDetailsModal';
import Pagination from '../components/Pagination';
import { useAuth } from '../hooks/useAuth';

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCards, setTotalCards] = useState(0);
  const { isLoggedIn } = useAuth();

  const cardsPerPage = 30;

  // Fetch all cards with pagination
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards', {
          params: { page: currentPage, limit: cardsPerPage }
        });
        if (response.data && Array.isArray(response.data)) {
          setCards(response.data);
          setTotalCards(response.data.length);
          setError(null); // Clear previous errors
        }

        if (isLoggedIn) {
          const token = localStorage.getItem('token');
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken._id);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching cards:', err);
        setError('An error occurred while fetching cards. Please try again later.');
        setLoading(false);
      }
    };

    fetchCards();
  }, [isLoggedIn, currentPage]);

  const handleLike = async (cardId) => {
    if (!isLoggedIn) return;

    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        {},
        {
          headers: { 'x-auth-token': token }
        }
      );

      setCards(prevCards =>
        prevCards.map(card =>
          card._id === cardId
            ? {
                ...card,
                likes: card.likes.includes(userId)
                  ? card.likes.filter(id => id !== userId)
                  : [...card.likes, userId]
              }
            : card
        )
      );
    } catch (error) {
      console.error('Error liking/unliking card:', error);
      setError('Error updating card. Please try again later.');
    }
  };

  const isCardLiked = (card) => {
    return card.likes && card.likes.includes(userId);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger" role="alert">{error}</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Business Cards</h1>

      {cards.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {cards.map((card) => (
            <div className="col" key={card._id}>
              <CardItem
                card={card}
                onLike={handleLike}
                isLiked={isCardLiked(card)}
                onCardClick={handleCardClick}
                isOwnCard={card.user_id === userId}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No cards available.</p>
      )}

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage}
        totalItems={totalCards}
        itemsPerPage={cardsPerPage}
        onPageChange={handlePageChange}
      />

      {selectedCard && (
        <CardDetailsModal card={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Cards;
