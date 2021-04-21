import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import match from '../../images/match.png';
import { End } from '../end/End';
import './game.css';

const startCount = 25;

export const Game = () => {
  const [playerCount, setPlayerCount] = useState(0);
  const [computerCount, setComputerCount] = useState(0);
  const count = useMemo(() => startCount - playerCount - computerCount,
    [playerCount, computerCount]);
  const [isPlayerTurn, setPlayerTurn] = useState(true);
  const [isPlayerWon, setIsPlayerWon] = useState(false);
  const countRef = useRef();
  countRef.current = count;

  const resetGame = useCallback(
    () => {
      setIsPlayerWon(false);
      setPlayerCount(0);
      setComputerCount(0);
      setPlayerTurn(true);
    },
    [],
  );

  const computerTurn = useCallback(
    () => {
      setTimeout(() => {
        let randomNumber;
        if (countRef.current === 1 || countRef.current === 2) {
          randomNumber = 1;
        }
        if (countRef.current === 3) {
          randomNumber = (computerCount + 1) % 2 === 0 ? 1 : 2;
        }
        if (countRef.current > 3) {
          if ((countRef.current - 1) % 4 === 0 || (countRef.current - 1) % 4 === 1) {
            randomNumber = 1;
          } else if ((countRef.current - 3) % 4 === 0 || (countRef.current - 3) % 4 === 1) {
            randomNumber = 3;
          }

          if (countRef.current - 3 === 3 && (computerCount + 3) % 2 !== 0) {
            randomNumber = 3;
          } else if (countRef.current - 2 === 3 && (computerCount + 2) % 2 !== 0) {
            randomNumber = 2;
          } else if (countRef.current - 1 === 3 && (computerCount + 1) % 2 !== 0) {
            randomNumber = 1;
          }
        }

        setComputerCount((prevState) => prevState + randomNumber);
        setPlayerTurn(true);
      }, 1000);
    },
    [],
  );

  const playerTurn = (event) => {
    const { value } = event.target;
    if (count === 0 || !isPlayerTurn || count - +value < 0) return;
    if (count === 3 && +value === 3) return;
    if (count === 2 && +value === 2) return;
    if (count - +value !== 0) {
      setPlayerCount(playerCount + +value);
      setPlayerTurn(false);
      computerTurn();
    } else {
      setPlayerCount(playerCount + +value);
      setPlayerTurn(false);
    }
  };

  useEffect(() => {
    if (count === 0 && playerCount % 2 === 0) {
      setIsPlayerWon(true);
    }
  }, [count, playerCount]);

  return (
    <>
      <button type="button" className="reset_button" onClick={resetGame}>Reset</button>
      <div className="players_counter">
        {'Computer count: '}
        {computerCount}
      </div>
      <div className="counter">
        Matches left:
        {count}
        <img src={match} alt="match" className="match_img" />
      </div>
      {count === 0 ? (<End isPlayerWon={isPlayerWon} />) : ''}
      <div className="players_counter" style={{ display: count === 0 ? 'none' : '' }}>
        {isPlayerTurn ? 'Your turn!' : 'Computer turn!'}
      </div>
      <div className="players_counter">
        {'Player count: '}
        {playerCount}
      </div>
      <div className="button_container">
        <button
          type="button"
          className="player_button"
          value={1}
          onClick={playerTurn}
        >
          1
        </button>
        <button
          type="button"
          className="player_button"
          value={2}
          onClick={playerTurn}
        >
          2
        </button>
        <button
          type="button"
          className="player_button"
          value={3}
          onClick={playerTurn}
        >
          3
        </button>
      </div>
    </>
  );
};
