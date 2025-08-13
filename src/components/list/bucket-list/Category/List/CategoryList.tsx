import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import CategoryClickable from '@/components/list/shopping-list/Category/CategoryClickable.tsx';
import './CategoryList.scss';
import NewCategory from '@/components/list/shopping-list/Category/NewCategory/NewCategory.tsx';
import { getAllBucketListCategoriesByAccountId } from '@/api/bucketListCategory.ts';

interface CategoryListProps {
  selectedCategoryId: string | null,
  setSelectedCategoryId: (categoryId: string | null) => void
}

const CategoryList: React.FC<CategoryListProps> = ({ selectedCategoryId, setSelectedCategoryId }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['bucket-list-categories'],
    queryFn: () => getAllBucketListCategoriesByAccountId()
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={true}
        autoHideDuration={2000}
        message={'Oops there was an error, please contact our IT department'}
      />
    );
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