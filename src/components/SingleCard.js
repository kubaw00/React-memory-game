import './SingleCard.css';

function Card({ card, handleChoice, flipped, disable }) {
  const choice = () => {
    if (!disable) {
      handleChoice(card);
    }
  };

  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : ''}>
        <img className='front' src={card.src} alt='front cart'></img>
        <img
          onClick={choice}
          className='back'
          src='./img/cover.png'
          alt='front cart'
        ></img>
      </div>
    </div>
  );
}

export default Card;
