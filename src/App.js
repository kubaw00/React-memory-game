import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cartImages = [
  { src: '/img/helmet-1.png', matches: false },
  { src: '/img/potion-1.png', matches: false },
  { src: '/img/ring-1.png', matches: false },
  { src: '/img/scroll-1.png', matches: false },
  { src: '/img/shield-1.png', matches: false },
  { src: '/img/sword-1.png', matches: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);

  const shuffleCarts = () => {
    const shuffledImages = [...cartImages, ...cartImages]
      .sort(() => Math.random() - 0.5)
      .map((cart) => ({ ...cart, id: Math.random() }));

    setCards(shuffledImages);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card);
  };

  const reset = () => {
    setChoice1(null);
    setChoice2(null);
    setTurns((prevTurn) => prevTurn + 1);
  };

  useEffect(() => {
    if (choice1 && choice2) {
      if (choice1.src === choice2.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choice1.src) {
              return { ...card, matches: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        setTimeout(() => {
          reset();
        }, 600);
      }
    }
  }, [choice1, choice2]);

  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCarts}>New Game</button>
      <div className='grid-card'>
        {cards.map((card) => (
          <SingleCard
            flipped={card === choice1 || card === choice2 || card.matches}
            key={card.id}
            card={card}
            handleChoice={handleChoice}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
