import React, { useState } from 'react';
import './NumberGame.css';

const NumberGame = () => {
  const [number, setNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState({ message: '', state: '' });

  const handleGuess = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const guessNum = parseInt(guess);
    if (guessNum === number) {
      setMessage({ message: 'You win!', state: 'success' });
      setNumber(Math.floor(Math.random() * 100) + 1);
    } else if (guessNum > number) {
      setMessage({ message: 'Try again! Too high.', state: 'faild' });
    } else {
      setMessage({ message: 'Try again! Too low.', state: 'faild' });
    }
    setGuess('');
  };

  const handleGuessChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setGuess(event.target.value);
  };

  return (
    <div className="wrapper">
      <p className="title">Guess a number between 1 and 100:</p>
      <form onSubmit={handleGuess} className="form">
        <input
          type="number"
          className="input"
          value={guess}
          onChange={handleGuessChange}
        />
        <button className="submit_button" type="submit">
          Guess
        </button>
      </form>
      <p className={`message_${message.state}`}>{message.message}</p>
    </div>
  );
};

export default NumberGame;
