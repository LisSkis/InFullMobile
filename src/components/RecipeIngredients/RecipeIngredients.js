import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Ingredient from '../Ingredient/Ingredient';
import List from '../../common/List';

const RecipeIngredients = ({
   visible,
   ingredients,
   handleDeleteClick,
   handleEditClick,
}) => (
   <div className={`recipe-menu-container ${visible ? 'active' : ''}`}>
      <div className={`recipe-menu ${visible ? 'active' : ''}`}>
         <h2 className="recipe-header">
            Ingredients
         </h2>
         <div className="recipe-ingredientsList">
            <List data={ingredients}><Ingredient /></List>
         </div>
         <div className="recipe-buttons-wrapper">
            <Button buttonType="delete" handleClick={handleDeleteClick}>
               Delete
            </Button>
            <Button handleClick={handleEditClick}>
               Edit
            </Button>
         </div>
      </div>
   </div>
);

RecipeIngredients.propTypes = {
   visible: PropTypes.bool,
   ingredients: PropTypes.arrayOf(PropTypes.object),
   handleDeleteClick: PropTypes.func.isRequired,
   handleEditClick: PropTypes.func.isRequired,
};

RecipeIngredients.defaultProps = {
   visible: false,
   ingredients: [],
};

export default RecipeIngredients;
