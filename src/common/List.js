import React from 'react';
import PropTypes from 'prop-types';

const List = ({ data, children }) => data.map((item) => {
   const childrenWithProps = React.cloneElement(children, { key: item.id, item });
   return childrenWithProps;
});

List.propTypes = {
   data: PropTypes.arrayOf(PropTypes.any).isRequired,
   children: PropTypes.node.isRequired,
};

export default List;
