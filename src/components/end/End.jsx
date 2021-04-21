import React from 'react';
import PropTypes from 'prop-types';

export const End = ({ isPlayerWon }) => (
  <div>
    { isPlayerWon ? 'Player won!' : ''}
    { !isPlayerWon ? 'Computer won!' : ''}
  </div>
);

End.propTypes = {
  isPlayerWon: PropTypes.bool.isRequired,
};
