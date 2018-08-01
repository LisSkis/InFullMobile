import React, { Component } from 'react';
import uuidV4 from 'uuid/v4';

import Modal, { modalTypes } from './Modal/Modal';
import RecipeItem from './RecipeItem/RecipeItem';
import Button from './Button/Button';

const modalHeaders = { add: 'Add a Recipe', edit: 'Edit a Recipe' };

class App extends Component {
  state = {
    recipes: [],
    recipeOpened: false,
    modalOpened: false,
    modalType: modalTypes.add,
    values: {
      name: '',
      ingredients: '',
    },
    recipeBeingEdited: '',
    submitError: '',
  };

  componentDidMount() {
    const recipes = localStorage.getItem('recipes') || '[]';

    try {
      this.setState({
        recipes: JSON.parse(recipes),
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  addRecipe = (nameValue, ingredients) => {
    const { recipes } = this.state;
    recipes.push({
      id: uuidV4(),
      name: nameValue,
      ingredients,
    });

    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({
      recipes,
      values: {
        name: '',
        ingredients: '',
      },
      modalOpened: false,
      submitError: '',
    });
  }

  editRecipe = (recipeBeingEdited, nameValue, ingredients) => {
    const { recipes } = this.state;
    const index = recipes.findIndex(recipe => recipe.id === recipeBeingEdited);
    recipes[index] = Object.assign(recipes[index], { name: nameValue, ingredients });

    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({
      recipes,
      values: {
        name: '',
        ingredients: '',
      },
      modalOpened: false,
      submitError: '',
    });
  }

  handleSubmit = () => {
    const {
      values,
      modalType,
      recipeBeingEdited,
    } = this.state;

    let ingredients = [];

    if (values.ingredients.split(',').length > 1) {
      ingredients = values.ingredients.split(',').filter(ingredient => ingredient.trim().length)
        .reduce((reduced, ingredient) => {
          if (typeof reduced !== 'object') {
            return [
              { id: uuidV4(), name: reduced.trim() },
              { id: uuidV4(), name: ingredient.trim() },
            ];
          }

          return reduced.concat({ id: uuidV4(), name: ingredient.trim() });
        });
    } else if (values.ingredients.split(',').length === 1) {
      ingredients = [{ id: uuidV4(), name: values.ingredients }];
    }

    if (!values.name) {
      return this.setState({ submitError: 'Recipe Name is required' });
    }

    if (!ingredients.length) {
      return this.setState({ submitError: 'Ingredients are required' });
    }

    if (modalType === modalTypes.add) {
      return this.addRecipe(values.name, ingredients);
    }

    return this.editRecipe(recipeBeingEdited, values.name, ingredients);
  }

  handleDelete = (id) => {
    const { recipes } = this.state;
    const index = recipes.findIndex(recipe => recipe.id === id);
    recipes.splice(index, 1);

    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({ recipes });
  }

  handleChange = (e) => {
    const newValue = { [e.target.dataset.name]: e.target.value };
    return this.setState(prevState => ({
      values: {
        ...prevState.values,
        ...newValue,
      },
    }));
  }

  handleEditClick = (id) => {
    const { recipes } = this.state;
    const index = recipes.findIndex(recipe => recipe.id === id);
    const ingredientsArray = recipes[index].ingredients.map(ingredient => ingredient.name);
    const ingredients = ingredientsArray.join(', ');

    this.setState({
      modalOpened: true,
      modalType: modalTypes.edit,
      values: {
        name: recipes[index].name,
        ingredients,
      },
      recipeBeingEdited: id,
      submitError: '',
    });
  }

  handleRecipeClick = id => this.setState(prevState => ({
    recipeOpened: prevState.recipeOpened === id ? false : id,
  }));

  handleAddRecipeClick = () => this.setState({ modalOpened: true, modalType: modalTypes.add, submitError: '' });

  closeModal = () => this.setState({ modalOpened: false, values: { name: '', ingredients: '' }, submitError: '' });

  render() {
    const {
      recipes,
      recipeOpened,
      modalType,
      modalOpened,
      values,
      submitError,
    } = this.state;

    return (
      <div>
        <div className="recipes-list">
          {recipes.map(recipe => (
            <RecipeItem
              key={recipe.id}
              visible={recipeOpened === recipe.id}
              recipe={recipe}
              handleClick={this.handleRecipeClick}
              handleDeleteClick={this.handleDelete}
              handleEditClick={this.handleEditClick}
            />
          ))}
        </div>
        <Button buttonType="primary" handleClick={this.handleAddRecipeClick}>
          Add Recipe
        </Button>
        <Modal
          type={modalType}
          visible={modalOpened}
          header={modalHeaders[modalType]}
          handleClose={this.closeModal}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          values={values}
          submitError={submitError}
        />
      </div>
    );
  }
}

export default App;
