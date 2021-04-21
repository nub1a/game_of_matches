import React, {
  useState, useCallback,
} from 'react';
import './App.css';
import { Start } from './components/start/Start';
import { Game } from './components/game/Game';

export const App = () => {
  const [isStarted, setIsStarted] = useState(false);

  const startGame = useCallback(
    () => {
      setIsStarted(true);
    },
    [],
  );

  return (
    <>
      <div className="computer" />
      <div className="board">
        <div className="start_container">
          {!isStarted
            ? <Start startGame={startGame} />
            : ''}
          {isStarted
            ? (<Game />)
            : ''}
        </div>
      </div>
    </>
  );
};
