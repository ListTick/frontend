import React from 'react';
import { ShoppingListCategoryResponse } from '@/types/shoppingListCategory.ts';
import ListItem from '@mui/material/ListItem';
import './CategoryClickable.scss'

interface CategoryClickableProps {
  category: ShoppingListCategoryResponse;
  onClick: (categoryId: string) => void;
  isSelected: boolean;
}

const CategoryClickable: React.FC<CategoryClickableProps> = ({ category, onClick, isSelected }) => {
  return (
    <ListItem
      className={`categoryClickable${isSelected ? '--selected' : ''}`}
      key={category.id}
      onClick={() => onClick(category.id)}
      style={!isSelected ? { backgroundColor: category.colour } : undefined}
    >
      <p>{category.name}</p>
    </ListItem>
  );
};

export default CategoryClickable;