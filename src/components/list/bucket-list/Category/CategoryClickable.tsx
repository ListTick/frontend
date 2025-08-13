import React from 'react';
import { ShoppingListCategoryResponse } from '@/types/shoppingListCategory.ts';
import ListItem from '@mui/material/ListItem';

interface CategoryClickableProps {
  category: ShoppingListCategoryResponse;
  onClick: (categoryId: string) => void;
  isSelected: boolean;
}

const CategoryClickable: React.FC<CategoryClickableProps> = ({ category, onClick, isSelected }) => {
  return (
    <ListItem
      className={`categoryClickable${isSelected ? 'categoryClickable--selected' : ''}`}
      key={category.id}
      onClick={() => onClick(category.id)}
      style={{backgroundColor: category.colour }}
    >
      <p>{category.name}</p>
    </ListItem>
  );
};

export default CategoryClickable;