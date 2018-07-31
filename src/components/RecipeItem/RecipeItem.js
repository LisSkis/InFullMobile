import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeMenu from '../RecipeMenu/RecipeMenu';

class RecipeItem extends Component {
   handleClick = () => this.props.handleClick(this.props.recipe.id);

   handleDeleteClick = () => this.props.handleDeleteClick(this.props.recipe.id);

   handleEditClick = () => this.props.handleEditClick(this.props.recipe.id);

   render() {
      const {
         visible,
         recipe,
      } = this.props;

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
            <RecipeMenu
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
