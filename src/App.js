import { useState } from 'react';
import './App.css';

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

  const shuffleCarts = () => {
    const shuffledImages = [...cartImages, ...cartImages]
      .sort(() => Math.random() - 0.5)
      .map((cart) => ({ ...cart, id: Math.random() }));

    setCards(shuffledImages);
    setTurns(0);
  };
  console.log(turns, cards);
  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCarts}>New Game</button>
    </div>
  );
}

export default App;
