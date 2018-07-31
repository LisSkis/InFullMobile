import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';

class RecipeItem extends Component {
   handleClick = () => {
      const { handleClick, recipe } = this.props;
      return handleClick(_.get(recipe, 'id'));
   }

   handleDeleteClick = () => {
      const { handleDeleteClick, recipe } = this.props;
      return handleDeleteClick(_.get(recipe, 'id'));
   }

   handleEditClick = () => {
      const { handleEditClick, recipe } = this.props;
      return handleEditClick(_.get(recipe, 'id'));
   }

   render() {
      const { visible, recipe } = this.props;

      return (
         <div className="recipe-container">
            <div
               className={`recipe ${visible ? 'active' : ''}`}
               onClick={this.handleClick}
            >
               <h1 className="recipe-name">
                  {recipe.name}
               </h1>
            </div>
            <RecipeIngredients
               visible={visible}
               ingredients={recipe.ingredients}
               handleDeleteClick={this.handleDeleteClick}
               handleEditClick={this.handleEditClick}
            />
         </div>
      );
   }
}

RecipeItem.propTypes = {
   visible: PropTypes.bool,
   recipe: PropTypes.objectOf(PropTypes.any).isRequired,
   handleClick: PropTypes.func.isRequired,
   handleEditClick: PropTypes.func.isRequired,
   handleDeleteClick: PropTypes.func.isRequired,
};

RecipeItem.defaultProps = {
   visible: false,
};

export default RecipeItem;
