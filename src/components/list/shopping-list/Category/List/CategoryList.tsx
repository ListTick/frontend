import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllShoppingListCategoriesByAccountId } from '@/api/shoppingListCategory.ts';
import { CircularProgress } from '@mui/material';
import Snackbar from '@/components/task/alert/Alert.tsx';
import CategoryClickable from '@/components/list/shopping-list/Category/CategoryClickable.tsx';
import './CategoryList.scss';
import NewCategory from '@/components/list/shopping-list/Category/NewCategory/NewCategory.tsx';

interface CategoryListProps {
  selectedCategoryId: string | null,
  setSelectedCategoryId: (categoryId: string | null) => void
}

const CategoryList: React.FC<CategoryListProps> = ({ selectedCategoryId, setSelectedCategoryId }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['shopping-list-categories'],
    queryFn: () => getAllShoppingListCategoriesByAccountId()
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !data) {
    return <Snackbar severity='error'>Oops there was an error, please contact our IT department</Snackbar>;
  }

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null);
    } else {
      setSelectedCategoryId(categoryId);
    }
  }

  if (data) {
    return (
      <div className="categoryListClickable">
        <NewCategory />
        {data.map((category) => (
          <CategoryClickable
            key={category.id}
            category={category}
            onClick={handleCategoryClick}
            isSelected={selectedCategoryId === category.id}
          />
        ))}
      </div>
    );
  }
}

export default CategoryList;