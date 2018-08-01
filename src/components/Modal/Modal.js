import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import CloseButton from '../CloseButton/CloseButton';

const buttonTypes = { add: 'Add Recipe', edit: 'Edit Recipe' };

export const modalTypes = { add: 'add', edit: 'edit' };

const Modal = ({
   type,
   visible,
   values,
   header,
   handleClose,
   handleChange,
   handleSubmit,
   submitError,
}) => ([
   <div className={`modal-wrapper ${visible ? 'active' : ''}`} key="wrapper" />,
   <div className={`modal ${visible ? 'active' : ''}`} key="modal">
      <div className="modal-header">
         <h1>{header}</h1>
         <CloseButton handleClick={handleClose} />
      </div>
      <div className="modal-body">
         <div className="add-recipe-name-container">
            <h3>Recipe</h3>
            <input
               className="name-input"
               data-name="name"
               placeholder="Recipe Name"
               value={values.name}
               onChange={handleChange}
            />
         </div>
         <div className="add-recipe-name-container">
            <h3>Ingredients</h3>
            <textarea
               className="ingredients-input"
               data-name="ingredients"
               placeholder="Enter Ingredients,Separated,By Commas"
               value={values.ingredients}
               onChange={handleChange}
            />
         </div>
         <p className="modal-error">{submitError}</p>
      </div>
      <div className="modal-footer">
         <Button buttonType="primary" handleClick={handleSubmit}>
            { buttonTypes[type]}
         </Button>
         <Button handleClick={handleClose}>Close</Button>
      </div>
   </div>,
]);

Modal.propTypes = {
   type: PropTypes.string.isRequired,
   visible: PropTypes.bool,
   values: PropTypes.objectOf(PropTypes.string).isRequired,
   header: PropTypes.string.isRequired,
   submitError: PropTypes.string,
   handleClose: PropTypes.func.isRequired,
   handleChange: PropTypes.func.isRequired,
   handleSubmit: PropTypes.func.isRequired,
};

Modal.defaultProps = {
   visible: false,
   submitError: '',
};

export default Modal;
