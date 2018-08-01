import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';

class RecipeItem extends Component {
   opened = this.props.recipeOpened === _.get(this.props, 'item.id');

   componentWillReceiveProps(nextProps) {
      const opened = nextProps.recipeOpened === _.get(this.props, 'item.id');
      if (opened !== this.opened) {
         this.opened = opened;
      }
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
      const { item } = this.props;

      return (
         <div className="recipe-container">
            <div
               className={`recipe ${this.opened ? 'active' : ''}`}
               onClick={this.handleClick}
            >
               <h1 className="recipe-name">
                  {item.name}
               </h1>
            </div>
            <RecipeIngredients
               visible={this.opened}
               ingredients={item.ingredients}
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
