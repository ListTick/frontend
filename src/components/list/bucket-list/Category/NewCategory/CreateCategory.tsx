import React, { useState } from 'react';
import { Button, Snackbar, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ShoppingListCategoryRequest } from '@/types/shoppingListCategory.ts';
import { createShoppingListCategory } from '@/api/shoppingListCategory.ts';
import './CreateCategory.scss'
import { HexColorPicker } from 'react-colorful';

interface CreateCategoryProps {
  handleClose: () => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({ handleClose }) => {
  const [name, setName] = useState<string>('');
  const [colour, setColour] = useState<string>('#494d50');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationKey: ['shopping-list-category-create'],
    mutationFn: (newCategory: ShoppingListCategoryRequest) => createShoppingListCategory(newCategory),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['shopping-list-categories'] });
      handleClose();
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data?.message || 'An unexpected error occurred.');
    }
  });

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
    <div className='createCategory'>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorMessage !== null}
        autoHideDuration={2000}
        onClose={() => setErrorMessage(null)}
        message={errorMessage}
      />

      <div className='createCategory__content'>
        <div className='createCategory__content__fields'>
          <h3>Create Category</h3>
          <TextField
            id='name'
            name='name'
            label='Name'
            variant='outlined'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='createCategory__content__color-picker'>
          <HexColorPicker color={colour} onChange={setColour} />
        </div>

        <div className='createCategory__content__buttons'>
          <div className='createCategory__content__buttons__navigate'>
            <Button variant='contained' size='medium' onClick={handleReset}>
              Reset
            </Button>
            <div className='createCategory__content__buttons__navigate__right'>
              <Button variant='contained' size='medium' onClick={handleClose}>
                Cancel
              </Button>
              <Button variant='contained' size='medium' onClick={create}>
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;