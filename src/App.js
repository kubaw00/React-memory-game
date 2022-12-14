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
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (choice1 && choice2) {
      setDisable(true);
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
        setTimeout(() => {
          reset();
        }, 600);
      } else {
        setTimeout(() => {
          reset();
        }, 1000);
      }
    }
  }, [choice1, choice2]);

  const shuffleCards = () => {
    const shuffledImages = [...cartImages, ...cartImages]
      .sort(() => Math.random() - 0.5)
      .map((cart) => ({ ...cart, id: Math.random() }));

    setChoice1(null);
    setChoice2(null);
    setCards(shuffledImages);
    setTurns(0);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleChoice = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card);
  };

  const reset = () => {
    setChoice1(null);
    setChoice2(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisable(false);
  };

  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='grid-card'>
        {cards.map((card) => (
          <SingleCard
            disable={disable}
            flipped={card === choice1 || card === choice2 || card.matches}
            key={card.id}
            card={card}
            handleChoice={handleChoice}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
