import { CircularProgress, Snackbar } from '@mui/material';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import './ShoppingListList.scss';
import { getAllShoppingListsByAccountId } from '@/api/shoppingList.ts';
import ListItem from '@/components/list/shopping-list/ListItem/ListItem.tsx';
import NewShoppingList from '@/components/list/shopping-list/List/NewList/NewShoppingList.tsx';
import { ShoppingListResponse } from '@/types/shoppingList.ts';

interface ShoppingListListProps {
  selectedCategoryId: string | null;
  onListClick: (shoppingList: ShoppingListResponse) => void;
}

const ShoppingListList: React.FC<ShoppingListListProps> = ({ selectedCategoryId, onListClick }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['shopping-lists'],
    queryFn: () => getAllShoppingListsByAccountId()
  });

  const filteredLists = data
    ? selectedCategoryId
      ? data.filter((list) => list.category.id === selectedCategoryId)
      : data
    : [];

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

  return (
    <div className='shoppingListList'>
      {filteredLists.map((shoppingList) => (
        <div key={shoppingList.id} onClick={() => onListClick(shoppingList)}>
          <ListItem shoppingList={shoppingList} />
        </div>
      ))}
      <NewShoppingList />
    </div>
  );
};

export default ShoppingListList;
