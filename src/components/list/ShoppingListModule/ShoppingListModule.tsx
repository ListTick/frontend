import React from 'react';
import './ShoppingListModule.scss';

const ShoppingListModule: React.FC = () => {
  return (
    <div className="shopping-list">
      <h2>Shopping List</h2>
      <ul>
        <li>Milk</li>
        <li>Bread</li>
        <li>Eggs</li>
      </ul>
    </div>
  );
};

export default ShoppingListModule;