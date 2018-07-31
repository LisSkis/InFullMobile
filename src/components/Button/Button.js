import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, children, handleClick }) => (
   <div className={`button ${type}`} onClick={handleClick}>{children}</div>
);

Button.propTypes = {
   type: PropTypes.string,
   children: PropTypes.node.isRequired,
   handleClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
   type: '',
};

export default Button;
