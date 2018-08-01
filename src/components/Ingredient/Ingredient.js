import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Ingredient extends PureComponent {
   render() {
      const { item } = this.props;

      return (
         <div className="recipe-ingredient">
            {item.name}
         </div>
      );
   }
}

Ingredient.propTypes = {
   item: PropTypes.objectOf(PropTypes.string),
};

Ingredient.defaultProps = {
   item: {},
};

export default Ingredient;
