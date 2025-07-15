import { CircularProgress } from '@mui/material';
import React from 'react';
import Snackbar from '../../task/alert/Alert.tsx';
import { useQuery } from '@tanstack/react-query';
import './ItemList.scss';
import { getAllItemsByShoppingListId } from '@/api/item.ts';
import NewItem from '@/components/list/Item/NewItem/NewItem.tsx';


const ItemList: React.FC<{ shoppingListId: string | null }> = ({ shoppingListId }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['items', shoppingListId],
    queryFn: () => shoppingListId ? getAllItemsByShoppingListId(shoppingListId) : [],
    enabled: !!shoppingListId
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !data) {
    return <Snackbar severity='error'>Oops there was an error, please contact our IT department</Snackbar>;
  }

  return (
    <div className='itemList'>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      <NewItem />
    </div>
  );
};

export default ItemList;
