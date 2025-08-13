import React, { useEffect, useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress, Snackbar } from '@mui/material';
import './CreateShoppingList.scss';
import { getAllShoppingListCategoriesByAccountId } from '@/api/shoppingListCategory.ts';
import { ShoppingListCategoryResponse } from '@/types/shoppingListCategory.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createShoppingList } from '@/api/shoppingList.ts';
import { AccountSharedWithRequest, ShoppingListRequest } from '@/types/shoppingList.ts';

interface CreateShoppingListProps {
  handleClose: () => void;
}

const SHARED_LIST_ID = "11111111-1111-1111-1111-111111111111";

const CreateShoppingList: React.FC<CreateShoppingListProps> = ({ handleClose }) => {
  const [categories, setCategories] = useState<ShoppingListCategoryResponse[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [shared, setShared] = useState<boolean>(false);
  const [sharedWithAccounts, setSharedWithAccounts] = useState<AccountSharedWithRequest[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['shopping-list-categories'],
    queryFn: () => getAllShoppingListCategoriesByAccountId()
  });

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const createMutation = useMutation({
    mutationKey: ['shopping-list-create'],
    mutationFn: (newList: ShoppingListRequest) => createShoppingList(newList),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['shopping-lists'] });
      handleClose();
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data?.message || 'An unexpected error occurred.');
    }
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

  const create = () => {
    const shoppingListRequest: ShoppingListRequest = {
      name,
      categoryId: selectedCategory,
      shared,
      ...(shared && { sharedWithAccounts })
    }
    createMutation.mutate(shoppingListRequest);
  };

  const handleReset = () => {
    setName('');
    setSelectedCategory('');
    setShared(false);
    setSharedWithAccounts([]);
  }

  return (
    <div className='createShoppingList'>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={errorMessage !== null}
        autoHideDuration={2000}
        onClose={() => setErrorMessage(null)}
        message={errorMessage}
      />
      <div className='createShoppingList__content'>
        <div className='createShoppingList__content__fields'>
          <h3>Create Shopping List</h3>
          <TextField
            id='name'
            name='name'
            label='Name'
            variant='outlined'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id='category-select-label'>{'Category'}</InputLabel>
            <Select
              labelId='category-select-label'
              id='category'
              value={selectedCategory}
              label='Category'
              onChange={(e) => setSelectedCategory(e.target.value)}
              disabled={shared}
            >
              {shared ? (
                <MenuItem value={SHARED_LIST_ID}>shared</MenuItem>
              ) : (
                categories
                  .filter((category) => category.name.toLowerCase() !== 'shared')
                  .map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))
              )}
            </Select>
          </FormControl>

          {shared && (
            <div className='createShoppingList__content__fields__sharing'>
              {sharedWithAccounts.map((sharedWith, index) => (
                <div className='createShoppingList__content__fields__sharing--record' key={index}>
                  <TextField
                    key={index}
                    label={'Email'}
                    variant='outlined'
                    type='email'
                    value={sharedWith.email}
                    onChange={(e) => {
                      const updated = [...sharedWithAccounts];
                      updated[index] = { ...updated[index], email: e.target.value };
                      setSharedWithAccounts(updated);
                    }}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    key={index}
                    label={'Cost Factor'}
                    variant='outlined'
                    type='number'
                    value={sharedWith.costFactor}
                    onChange={(e) => {
                      const updated = [...sharedWithAccounts];
                      updated[index] = { ...updated[index], costFactor: Number(e.target.value) };
                      setSharedWithAccounts(updated);
                    }}
                    inputProps={{ min: 0, max: 100 }}
                    sx={{ width: 100 }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='createShoppingList__content__buttons'>
          <Button
            variant='text'
            size='medium'
            onClick={() => {
              setSelectedCategory(SHARED_LIST_ID);
              setShared(true);
              setSharedWithAccounts([...sharedWithAccounts, { email: '', costFactor: 0 }]);
            }}
            disabled={sharedWithAccounts.length >= 5}
          >
            Add another user
          </Button>

          <div className='createShoppingList__content__buttons__navigate'>
            <Button variant='contained' size='medium' onClick={handleReset}>
              Reset
            </Button>

            <div className='createShoppingList__content__buttons__navigate__right'>
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

export default CreateShoppingList;

