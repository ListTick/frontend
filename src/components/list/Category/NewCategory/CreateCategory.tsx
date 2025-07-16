import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ShoppingListCategoryRequest } from '@/types/shoppingListCategory.ts';
import { createShoppingListCategory } from '@/api/shoppingListCategory.ts';

interface CreateCategoryProps {
  handleClose: () => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({ handleClose }) => {
  const [name, setName] = useState<string>('');
  const [colour, setColour] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationKey: ['shopping-list-category-create'],
    mutationFn: (newCategory: ShoppingListCategoryRequest) => createShoppingListCategory(newCategory),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['shopping-list-categories'] })
      handleClose();
    },
    onError: (error) => {
      setErrorMessage((error as any)?.response?.data?.message ?? 'An unexpected error occurred.');
      setOpen(true);
    }
  })

  const create = () => {
    const categoryRequest: ShoppingListCategoryRequest = {
      name,
      ...(colour && { colour })
    };
    createMutation.mutate(categoryRequest);
  };

  const handleReset = () => {
    setName('');
    setColour('');
  };

  return (
    <div className='createShoppingList'>
      <div className='createShoppingList__content'>
        <h3>Create Shopping List</h3>
        <TextField
          id='name'
          name='name'
          label='Name'
          variant='outlined'
          type='text'
          value={name}
          error={open}
          helperText={open ? errorMessage : ''}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id='colour'
          name='colour'
          label='colour'
          variant='outlined'
          type='text'
          value={colour}
          onChange={(e) => setColour(e.target.value)}
        />
        <div className='createShoppingList__content__buttons'>
          <Button variant='contained' size='small' onClick={handleReset}>
            Reset
          </Button>
          <div className='createShoppingList__content__buttons__right'>
            <Button variant='contained' size='small' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='contained' size='small' onClick={create}>
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;