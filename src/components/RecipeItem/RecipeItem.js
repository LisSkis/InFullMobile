import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';

class RecipeItem extends Component {
   opened = this.props.recipeOpened === _.get(this.props, 'item.id');

   name = this.props.item.name;

   ingredients = this.props.item.ingredients;

   shouldComponentUpdate(nextProps) {
      let shouldUpdate = false;
      const { item, recipeOpened } = nextProps;
      const opened = nextProps.recipeOpened === _.get(item, 'id');
      if (opened !== this.opened) {
         shouldUpdate = true;
      } else if (this.name !== item.name) {
         shouldUpdate = true;
      } else if (JSON.stringify(this.ingredients) !== JSON.stringify(item.ingredients)) {
         shouldUpdate = true;
      }

      this.opened = recipeOpened === _.get(item, 'id');
      this.name = _.get(item, 'name');
      this.ingredients = _.get(item, 'ingredients');

      return shouldUpdate;
   }

   handleClick = () => {
      const { handleClick, item } = this.props;
      return handleClick(_.get(item, 'id'));
   }

   handleDeleteClick = () => {
      const { handleDeleteClick, item } = this.props;
      return handleDeleteClick(_.get(item, 'id'));
   }

   handleEditClick = () => {
      const { handleEditClick, item } = this.props;
      return handleEditClick(_.get(item, 'id'));
   }

   render() {
      return (
         <div className="recipe-container">
            <div
               className={`recipe ${this.opened ? 'active' : ''}`}
               onClick={this.handleClick}
            >
               <h1 className="recipe-name">
                  {this.name}
               </h1>
            </div>
            <RecipeIngredients
               visible={this.opened}
               ingredients={this.ingredients}
               handleDeleteClick={this.handleDeleteClick}
               handleEditClick={this.handleEditClick}
            />
         </div>
      );
   }
}

RecipeItem.propTypes = {
   recipeOpened: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
   item: PropTypes.objectOf(PropTypes.any),
   handleClick: PropTypes.func.isRequired,
   handleEditClick: PropTypes.func.isRequired,
   handleDeleteClick: PropTypes.func.isRequired,
};

RecipeItem.defaultProps = {
   recipeOpened: false,
   item: {},
};

export default RecipeItem;
