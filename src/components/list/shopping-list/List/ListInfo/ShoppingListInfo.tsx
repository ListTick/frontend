import React, { useEffect, useState } from 'react';
import './ShoppingListInfo.scss';
import { ShoppingListRequestUpdate, ShoppingListResponse } from '@/types/shoppingList.ts';
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllShoppingListCategoriesByAccountId } from '@/api/shoppingListCategory.ts';
import { ShoppingListCategoryResponse } from '@/types/shoppingListCategory.ts';
import { updateShoppingListByFields } from '@/api/shoppingList.ts';

interface ShoppingListInfoProps {
  shoppingList: ShoppingListResponse;
  handleClose: () => void;
}

const SHARED_LIST_ID = "11111111-1111-1111-1111-111111111111";

const ShoppingListInfo: React.FC<ShoppingListInfoProps> = ({ shoppingList, handleClose }) => {
  const [categories, setCategories] = useState<ShoppingListCategoryResponse[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(shoppingList.category.id);
  const [name, setName] = useState<string>(shoppingList.name);
  const [previousName, setPreviousName] = useState<string | null>(null);
  const [previousCategory, setPreviousCategory] = useState<string | null>(null);
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

  const updateMutation = useMutation({
    mutationKey: ['shopping-list-update'],
    mutationFn: ({ id, updatedList }: { id: string; updatedList: ShoppingListRequestUpdate }) =>
      updateShoppingListByFields(id, updatedList),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['shopping-lists'] });
      setPreviousName(null)
      setPreviousCategory(null)
      handleClose();
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data?.message || 'An unexpected error occurred.');
      setPreviousName(null)
      setPreviousCategory(null)
    }
  })

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

  const handleReset = () => {
    if (previousName !== null) {
      setName(previousName);
      setPreviousName(null);
    }

    if (previousCategory !== null) {
      setSelectedCategory(previousCategory);
      setPreviousCategory(null);
    }
  }

  const handleUpdate = () => {
    if (previousName === null && previousCategory === null) {
      handleClose();
      return;
    }
    const shoppingListRequestUpdate: ShoppingListRequestUpdate = {
      ...(previousName !== null && { name }),
      ...(previousCategory !== null && { categoryId: selectedCategory })
    };
    updateMutation.mutate({
      id: shoppingList.id,
      updatedList: shoppingListRequestUpdate
    });
  }

  const handleDelete = () => {
    const shoppingListRequestUpdate: ShoppingListRequestUpdate = {
      active: false
    };
    updateMutation.mutate({
      id: shoppingList.id,
      updatedList: shoppingListRequestUpdate
    });
  }

  return (
    <div className='shopping-list-info'>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorMessage !== null}
        autoHideDuration={2000}
        onClose={() => setErrorMessage(null)}
        message={errorMessage}
      />
      <div className='shopping-list-info__content'>
        <div className='shopping-list-info__content__fields'>
          <h3>Shopping List Details</h3>
          <TextField
            id='name'
            name='name'
            label='Name'
            variant='outlined'
            type='text'
            value={name}
            onChange={(e) => {
              setPreviousName(name);
              setName(e.target.value);
            }}
          />
          <FormControl fullWidth>
            <InputLabel id='category-select-label'>{'Category'}</InputLabel>
            <Select
              labelId='category-select-label'
              id='category'
              value={selectedCategory}
              label='Category'
              onChange={(e) => {
                setPreviousCategory(selectedCategory)
                setSelectedCategory(e.target.value);
              }}
              disabled={shoppingList.shared}
            >
              {shoppingList.shared ? (
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
          <TextField
            id='created'
            name='created'
            label='Created'
            variant='outlined'
            type='text'
            value={shoppingList.creationDate.toString()}
            disabled={true}
          />
          {shoppingList.shared && shoppingList.sharedWithAccounts && (
            <FormControl fullWidth>
              <p>Shared With:</p>
              <div>
                {shoppingList.sharedWithAccounts.map((account, idx) => (
                  <div key={account.email ?? idx} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                    <TextField
                      label='Email'
                      value={account.email}
                      disabled={true}
                      size='small'
                      variant='outlined'
                      style={{ flex: 1 }}
                    />
                    <TextField
                      label='Cost factor'
                      value={account.costFactor}
                      disabled={true}
                      size='small'
                      variant='outlined'
                      style={{ width: '120px' }}
                    />
                  </div>
                ))}
              </div>
            </FormControl>
          )}
        </div>
        <div className='shopping-list-info__content__buttons'>
          <div className='shopping-list-info__content__buttons__firstRow'>
            <Button variant='contained' size='small' onClick={handleDelete}>
              Delete
            </Button>
          </div>
          <div className='shopping-list-info__content__buttons__secondRow'>
            <Button variant='contained' size='small' onClick={handleReset}>
              Reset
            </Button>

            <div className='shopping-list-info__content__buttons__secondRow__right'>
              <Button variant='contained' size='small' onClick={handleClose}>
                Cancel
              </Button>
              <Button variant='contained' size='small' onClick={handleUpdate}>
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListInfo;
