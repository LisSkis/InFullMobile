import React from 'react';
import PropTypes from 'prop-types';

const Ingredient = ({ item }) => (
   <div className="recipe-ingredient">
      {item.name}
   </div>
);

Ingredient.propTypes = {
   item: PropTypes.objectOf(PropTypes.string),
};

Ingredient.defaultProps = {
   item: {},
};

export default Ingredient;
