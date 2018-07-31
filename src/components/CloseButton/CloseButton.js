import React from 'react';
import PropTypes from 'prop-types';

const CloseButton = ({ handleClick }) => <div onClick={handleClick} className="close" />;

CloseButton.propTypes = {
   handleClick: PropTypes.func.isRequired,
};

export default CloseButton;
