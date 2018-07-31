import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ buttonType, children, handleClick }) => (
   <div className={`button ${buttonType}`} onClick={handleClick}>{children}</div>
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
