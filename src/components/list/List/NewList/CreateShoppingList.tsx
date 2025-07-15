import React, { useEffect, useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import './CreateShoppingList.scss';
import { getAllShoppingListCategoriesByAccountId } from '@/api/shoppingListCategory';
import { ShoppingListCategoryResponse } from '@/types/shoppingListCategory';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Snackbar from '@/components/task/alert/Alert.tsx';
import { createShoppingList } from '@/api/shoppingList.ts';
import { AccountSharedWithRequest, ShoppingListRequest } from '@/types/shoppingList.ts';

interface CreateShoppingListProps {
  handleClose: () => void;
}

const CreateShoppingList: React.FC<CreateShoppingListProps> = ({ handleClose }) => {
  const [categories, setCategories] = useState<ShoppingListCategoryResponse[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [shared, setShared] = useState<boolean>(false);
  const [sharedWithAccounts, setSharedWithAccounts] = useState<AccountSharedWithRequest[]>([]);

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
    mutationKey: ['shopping-lists-create'],
    mutationFn: (newList: ShoppingListRequest) => createShoppingList(newList),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['shopping-lists'] })
    }
  })

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !data) {
    return <Snackbar severity='error'>Oops there was an error, please contact our IT department</Snackbar>;
  }

  const create = () => {
    const shoppingListRequest: ShoppingListRequest = {
      name,
      categoryId: selectedCategory,
      shared,
      ...(shared && { sharedWithAccounts })
    }
    createMutation.mutate(shoppingListRequest);
    handleClose();
  };

  const handleReset = () => {
    setName('');
    setSelectedCategory('');
    setShared(false);
    setSharedWithAccounts([]);
  }

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
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id='category-select-label'>Category</InputLabel>
          <Select
            labelId='category-select-label'
            id='category'
            value={selectedCategory}
            label='Category'
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {shared && (
          <div className='createShoppingList__content__sharing'>
            {sharedWithAccounts.map((sharedWith, index) => (
              <div className='createShoppingList__content__sharing__record' key={index}>
                <TextField
                  key={index}
                  label={`Email ${index + 1}`}
                  variant='outlined'
                  type='email'
                  value={sharedWith.email}
                  onChange={(e) => {
                    const updated = [...sharedWithAccounts];
                    updated[index] = { ...updated[index], email: e.target.value };
                    setSharedWithAccounts(updated);
                  }}
                />
                <TextField
                  key={index}
                  label={`Cost Factor ${index + 1}`}
                  variant='outlined'
                  type='number'
                  value={sharedWith.costFactor}
                  onChange={(e) => {
                    const updated = [...sharedWithAccounts];
                    updated[index] = { ...updated[index], costFactor: Number(e.target.value) };
                    setSharedWithAccounts(updated);
                  }}
                />
              </div>
            ))}
          </div>
        )}
        <Button
          variant='text'
          size='small'
          onClick={() => {
            setShared(true);
            setSharedWithAccounts([...sharedWithAccounts, { email: '', costFactor: 0 }]);
          }}
        >
          Add another user
        </Button>

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

export default CreateShoppingList;

