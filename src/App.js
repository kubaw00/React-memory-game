import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cartImages = [
  { src: '/img/helmet-1.png' },
  { src: '/img/potion-1.png' },
  { src: '/img/ring-1.png' },
  { src: '/img/scroll-1.png' },
  { src: '/img/shield-1.png' },
  { src: '/img/sword-1.png' },
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
        reset();
        console.log('takie same elementy');
      } else {
        reset();
        console.log('nie te same');
      }
    }
  }, [choice1, choice2]);

  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCarts}>New Game</button>
      <div className='grid-card'>
        {cards.map((card) => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
}

export default App;
