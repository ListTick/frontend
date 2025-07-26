import React, { useState } from 'react';
import './NewItem.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ItemRequest } from '@/types/shoppingListItem.ts';
import { createItem } from '@/api/shoppingListItem.ts';
import { Button, Snackbar, TextField } from '@mui/material';
import { ShoppingListResponse } from '@/types/shoppingList.ts';

interface NewItemProps {
  shoppingList: ShoppingListResponse
}

const NewItem: React.FC<NewItemProps> = ({ shoppingList }) => {
  const [name, setName] = useState<string>('');
  const [value, setValue] = useState<number | ''>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const handleCreate = () => {
    const itemRequest: ItemRequest = {
      name,
      ...(value !== '' && { value }),
      shoppingListId: shoppingList.id
    };
    createMutation.mutate(itemRequest);
  };

  const createMutation = useMutation({
    mutationKey: ['shopping-list-item-create'],
    mutationFn: (itemRequest: ItemRequest) => createItem(itemRequest),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['shopping-list-items', shoppingList.id] });
      setName('');
      setValue('');
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data?.message || 'An unexpected error occurred.');
    }
  });

  return (
    <div className='createItem'>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorMessage !== null}
        autoHideDuration={2000}
        onClose={() => setErrorMessage(null)}
        message={errorMessage}
      />
      <div className='createItem__content'>
        <div className='createItem__content--inputs'>
          <TextField
            id='name'
            name='name'
            label='Name'
            variant='outlined'
            size='small'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ flex: 1, width: 400 }}
          />
          <TextField
            id='value'
            name='value'
            label='Value'
            variant='outlined'
            size='small'
            type='number'
            value={ value }
            onChange={(e) => setValue(e.target.value === '' ? '' : Number(e.target.value))}
            sx={{ width: 100 }}
          />
        </div>
        <Button
          variant='contained'
          size='small'
          onClick={handleCreate}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default NewItem;