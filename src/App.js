import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import match from './images/match.png';

export const App = () => {

  const [count, setCount] = useState(25);
  const [playerCount, setPlayerCount] = useState(0);
  const [computerCount, setComputerCount] = useState(0);
  const [isPlayerTurn, setPlayerTurn] = useState(true);
  const [isStarted, setisStarted] = useState(false);
  const [whoWon, setWhoWon] = useState(null);
  const countRef = useRef();
  countRef.current = count;

  useEffect(() => {
    if (count === 0) {
      if (playerCount % 2 === 0) {
        setWhoWon('user');
      } else {
        setWhoWon('computer');
      }
    }
  }, [count]);

  const startGame = () => {
    setisStarted(true);
  }

  const resetGame = () => {
    setCount(25);
    setWhoWon(null);
    setPlayerCount(0);
    setComputerCount(0);
    setPlayerTurn(true);
  }

  const computerTurn = () => {
    setTimeout(() => {
      let randomNumber;
      if (countRef.current === 1) {
        randomNumber = 1;
      } else if (countRef.current === 3) {
        randomNumber = (computerCount + 1) % 2 === 0 ? 3 : 2;
      } else if (countRef.current < 3) {
        randomNumber = (computerCount + 1) % 2 === 0 ? 1 : 2;
      } else {
        randomNumber = Math.floor(Math.random() * 3) + 1;
      }
      setCount(prevState => {
        return prevState - randomNumber;
      });
      setComputerCount(prevState => {
        return prevState + randomNumber;
      });
      setPlayerTurn(true);
    }, 1000);
  }

  const playerTurn = (event) => {
    const {innerText} = event.target;
    if (count === 0 || !isPlayerTurn || count - +innerText < 0) return;
    if (count - +innerText !== 0) {
      setCount(count - +innerText);
      setPlayerCount(playerCount + +innerText);
      setPlayerTurn(false);
      computerTurn();
    } else {
      setCount(count - +innerText);
      setPlayerCount(playerCount + +innerText);
      setPlayerTurn(false);
    }
  }

  return (
      <>
        <div className="computer"/>
        <div className="board">
          {!isStarted
              ? <div className="start_container">
                  <button className="start_button" onClick={startGame}>Start</button>
                </div>
              : ''
          }
          {isStarted
              ? <>
                  <button className="reset_button" onClick={resetGame}>Reset</button>
                  <div className="players_counter">{'Computer count: '}{computerCount}</div>
                  <div className="counter">
                    Matches left:{count}
                    <img src={match} alt="match" className="match_img"/>
                  </div>
                  <div className="who_won">
                    {whoWon === 'user' ? 'Player won!' : ''}
                    {whoWon === 'computer' ? 'Computer won!' : ''}
                  </div>
                  <div className="players_counter" style={{display: whoWon ? 'none' : ''}}>
                    {isPlayerTurn ? 'Your turn!' : 'Computer turn!'}
                  </div>
                  <div className="players_counter">{'Player count: '}{playerCount}</div>
                  <div className="button_container">
                    <button className="player_button" onClick={playerTurn}>1</button>
                    <button className="player_button" onClick={playerTurn}>2</button>
                    <button className="player_button" onClick={playerTurn}>3</button>
                  </div>
                </>
              : ''}
        </div>
      </>
  );
}
