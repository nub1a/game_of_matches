import React from 'react';
import PropTypes from 'prop-types';
import './start.css';

export const Start = ({ startGame }) => (
  <button type="button" className="start_button" onClick={() => { startGame(); }}>Start</button>
);

Start.propTypes = {
  startGame: PropTypes.func.isRequired,
};
