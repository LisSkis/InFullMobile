import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ buttonType, children, handleClick }) => (
   <button className={`button ${buttonType}`} onClick={handleClick} type="button">{children}</button>
);

Button.propTypes = {
   buttonType: PropTypes.string,
   children: PropTypes.node.isRequired,
   handleClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
   buttonType: '',
};

export default Button;
