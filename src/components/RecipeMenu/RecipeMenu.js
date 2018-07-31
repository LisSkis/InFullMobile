import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const RecipeMenu = ({
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
            {ingredients.map(ingredient => (
               <div className="recipe-ingredient" key={ingredient.id}>
                  {ingredient.name}
               </div>
            ))}
         </div>
         <div className="recipe-buttons-wrapper">
            <Button type="delete" handleClick={handleDeleteClick}>
               Delete
            </Button>
            <Button handleClick={handleEditClick}>
               Edit
            </Button>
         </div>
      </div>
   </div>
);

RecipeMenu.propTypes = {
   visible: PropTypes.bool,
   ingredients: PropTypes.arrayOf(PropTypes.object),
   handleDeleteClick: PropTypes.func.isRequired,
   handleEditClick: PropTypes.func.isRequired,
};

RecipeMenu.defaultProps = {
   visible: false,
   ingredients: [],
};

export default RecipeMenu;
