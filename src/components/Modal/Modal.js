import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import CloseButton from '../CloseButton/CloseButton';

const Modal = ({
   type,
   visible,
   nameValue,
   ingredientsValue,
   handleClose,
   handleChange,
   handleSubmit,
}) => (
   <div className={`modal-wrapper ${visible ? 'active' : ''}`}>
      <div className={`modal ${visible ? 'active' : ''}`}>
         <div className="modal-header">
            {
               type === 'add' && <h1>Add a Recipe</h1>
            }
            {
               type === 'edit' && <h1>Edit a Recipe</h1>
            }
            <CloseButton handleClick={handleClose} />
         </div>
         <div className="modal-body">
            <div className="add-recipe-name-container">
               <h3>Recipe</h3>
               <input
                  className="name-input"
                  data-name="nameValue"
                  placeholder="Recipe Name"
                  value={nameValue}
                  onChange={handleChange}
               />
            </div>
            <div className="add-recipe-name-container">
               <h3>Ingredients</h3>
               <textarea
                  className="ingredients-input"
                  data-name="ingredientsValue"
                  placeholder="Enter Ingredients,Separated,By Commas"
                  value={ingredientsValue}
                  onChange={handleChange}
               />
            </div>
         </div>
         <div className="modal-footer">
            <Button type="primary" handleClick={handleSubmit}>
               { type === 'add' ? 'Add Recipe' : 'Edit Recipe' }
            </Button>
            <Button handleClick={handleClose}>Close</Button>
         </div>
      </div>
   </div>
);

Modal.propTypes = {
   type: PropTypes.string.isRequired,
   visible: PropTypes.bool,
   nameValue: PropTypes.string.isRequired,
   ingredientsValue: PropTypes.string.isRequired,
   handleClose: PropTypes.func.isRequired,
   handleChange: PropTypes.func.isRequired,
   handleSubmit: PropTypes.func.isRequired,
};

Modal.defaultProps = {
   visible: false,
};

export default Modal;
