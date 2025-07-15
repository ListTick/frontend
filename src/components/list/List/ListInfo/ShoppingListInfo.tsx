import React/*, { useState }*/ from 'react';
import './ShoppingListInfo.scss';
import { ShoppingListResponse } from '@/types/shoppingList.ts';

interface ShoppingListInfoProps {
  shoppingList: ShoppingListResponse;
  handleClose: () => void;
}

const ShoppingListInfo: React.FC<ShoppingListInfoProps> = ({ shoppingList/*, handleClose*/ }) => {
  return (
    <div className='shopping-list-details'>
      <div className='shopping-list-details__grid'>
        <h2>{ shoppingList.name }</h2>
        <div className='shopping-list-details__item'>
          <label>Category:</label>
          <span>{ shoppingList.category.name }</span>
        </div>
        <div className='shopping-list-details__item'>
          <label>Created:</label>
          <span>{ shoppingList.creationDate.getDate() }</span>
        </div>
        <div className='shopping-list-details__item'>
          <label>Shared:</label>
          <span>{ shoppingList.shared }</span>
        </div>
        //todo if shared displayed shared with users
        </div>
      </div>
  );
};

export default ShoppingListInfo;
