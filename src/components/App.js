import React, { Component } from 'react';
import uuidV4 from 'uuid/v4';

import Modal from './Modal/Modal';
import RecipeItem from './RecipeItem/RecipeItem';
import Button from './Button/Button';

class App extends Component {
  constructor(props) {
    super(props);

    const recipes = localStorage.getItem('recipes') || '[]';

    this.state = {
      recipes: JSON.parse(recipes),
      recipeOpened: false,
      modalOpened: false,
      modalType: 'add',
      nameValue: '',
      ingredientsValue: '',
      recipeBeingEdited: '',
    };
  }

  addRecipe = (nameValue, ingredients, recipes) => {
    recipes.push({
      id: uuidV4(),
      name: nameValue,
      ingredients,
    });

    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({
      recipes,
      nameValue: '',
      ingredientsValue: '',
      modalOpened: false,
    });
  }

  editRecipe = (prevRecipes, recipeBeingEdited, nameValue, ingredients) => {
    const recipes = [...prevRecipes];
    const index = recipes.findIndex(recipe => recipe.id === recipeBeingEdited);
    recipes[index].name = nameValue;
    recipes[index].ingredients = ingredients;

    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({
      recipes,
      nameValue: '',
      ingredientsValue: '',
      modalOpened: false,
    });
  }

  handleSubmit = () => {
    const {
      nameValue,
      ingredientsValue,
      recipes,
      modalType,
      recipeBeingEdited,
    } = this.state;

    const ingredientsArray = ingredientsValue.split(',');
    const ingredients = [];
    ingredientsArray.forEach(ingredient => ingredient.trim().length && ingredients.push({
      id: uuidV4(),
      name: ingredient.trim(),
    }));

    if (modalType === 'add') {
      this.addRecipe(nameValue, ingredients, recipes);
    } else {
      this.editRecipe(recipes, recipeBeingEdited, nameValue, ingredients);
    }
  }

  handleDelete = (id) => {
    const { recipes } = this.state;
    const index = recipes.findIndex(recipe => recipe.id === id);
    recipes.splice(index, 1);

    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({ recipes });
  }

  handleChange = e => this.setState({ [e.target.dataset.name]: e.target.value });

  handleEditClick = (id) => {
    const { recipes } = this.state;
    const index = recipes.findIndex(recipe => recipe.id === id);
    const ingredientsArray = recipes[index].ingredients.map(ingredient => ingredient.name);
    const ingredientsValue = ingredientsArray.join(', ');

    this.setState({
      modalOpened: true,
      modalType: 'edit',
      nameValue: recipes[index].name,
      ingredientsValue,
      recipeBeingEdited: id,
    });
  }

  handleRecipeClick = id => this.setState(prevState => ({
    recipeOpened: prevState.recipeOpened === id ? false : id,
  }));

  handleAddRecipeClick = () => this.setState({ modalOpened: true, modalType: 'add' });

  closeModal = () => this.setState({ modalOpened: false, nameValue: '', ingredientsValue: '' });

  render() {
    const {
      recipes,
      recipeOpened,
      modalType,
      modalOpened,
      nameValue,
      ingredientsValue,
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
        <Button type="primary" handleClick={this.handleAddRecipeClick}>
          Add Recipe
        </Button>
        <Modal
          type={modalType}
          visible={modalOpened}
          handleClose={this.closeModal}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          nameValue={nameValue}
          ingredientsValue={ingredientsValue}
        />
      </div>
    );
  }
}

export default App;
