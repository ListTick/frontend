import React from 'react';
import { BucketListCategoryResponse } from '@/types/bucketListCategory.ts';
import ListItem from '@mui/material/ListItem';
import '../../bucket-list/Category/CategoryClickable.scss'

interface CategoryClickableProps {
  category: BucketListCategoryResponse;
  onClick: (categoryId: string) => void;
  isSelected: boolean;
}

const CategoryClickable: React.FC<CategoryClickableProps> = ({ category, onClick, isSelected }) => {
  return (
    <ListItem
      className={`categoryClickable${isSelected ? '--selected' : ''}`}
      key={category.id}
      onClick={() => onClick(category.id)}
      style={{backgroundColor: category.colour }}
    >
      <p>{category.name}</p>
    </ListItem>
  );
};

export default CategoryClickable;