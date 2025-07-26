import React, { useState } from 'react';
import {
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Checkbox,
  TextField,
  Snackbar
} from '@mui/material';
import './DeleteItem.scss';
import { ShoppingListResponse } from '@/types/shoppingList.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deactivateItem } from '@/api/shoppingListItem.ts';
import { ExpenseRequest } from '@/types/expense.ts';
import { createExpense } from '@/api/expense.ts';

interface DeleteItemProps {
  selectedItems: string[];
  clearSelectedItems: () => void;
  shoppingList: ShoppingListResponse;
  handleClose: () => void;
}

const DeleteItem: React.FC<DeleteItemProps> = ({ selectedItems, clearSelectedItems, shoppingList, handleClose }) => {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('PLN');
  const [reimbursed, setReimbursed] = useState<boolean>(false);
  const [addExpense, setAddExpense] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const deactivateItemMutation = useMutation({
    mutationKey: ['item-patch'],
    mutationFn: (id: string) =>
      deactivateItem(id),
    onError: (error: any) => {
      setErrorMessage(error?.response?.data?.message || 'An unexpected error occurred.');
    }
  });

  const createExpenseMutation = useMutation({
    mutationKey: ['expense-create'],
    mutationFn: (expenseRequest: ExpenseRequest) => createExpense(expenseRequest),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data?.message || 'An unexpected error occurred.');
    }
  });

  const deleteItems = () => {
    Promise.all(
      selectedItems.map((id) =>
        deactivateItemMutation.mutateAsync(id)
      )
    ).then(() => {
      void queryClient.invalidateQueries({ queryKey: ['items', shoppingList.id] });
      if (addExpense) {
        const expenseRequest: ExpenseRequest = {
          amount,
          currency,
          reimbursed: shoppingList.shared ? reimbursed : true,
          shoppingListId: shoppingList.id,
          items: selectedItems
        };
        createExpenseMutation.mutate(expenseRequest);
      }
      clearSelectedItems();
      handleClose();
    });
  };

  return (
    <div className='deleteItem'>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorMessage !== null}
        autoHideDuration={2000}
        onClose={() => setErrorMessage(null)}
        message={errorMessage}
      />
      <div className='deleteItem__content'>
        <h3>Confirm Delete</h3>
        <FormControlLabel
          control={<Checkbox checked={addExpense} onChange={(e) => setAddExpense(e.target.checked)} />}
          label='Add Expense'
        />
        {addExpense && (
          <div className='deleteItem__content__fields'>
            <div className='deleteItem__content__fields__expense'>
              <TextField
                id='amount'
                name='amount'
                label='Amount'
                variant='outlined'
                type='number'
                size='small'
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <FormControl variant='outlined' size='small' style={{ minWidth: 120 }}>
                <InputLabel id='currency-label'>Currency</InputLabel>
                <Select
                  labelId='currency-label'
                  id='currency'
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as string)}
                  label='Currency'
                >
                  <MenuItem value='PLN'>PLN</MenuItem>
                  <MenuItem value='USD'>USD</MenuItem>
                  <MenuItem value='EUR'>EUR</MenuItem>
                </Select>
              </FormControl>
            </div>
            {shoppingList.shared && (
              <FormControlLabel
                control={<Checkbox checked={reimbursed} onChange={(e) => setReimbursed(e.target.checked)} />}
                label='Reimbursed'
              />
            )}
          </div>
        )}
      </div>
      <div className='deleteItem__buttons'>
        <Button variant='contained' size='small' onClick={handleClose}>
          Cancel
        </Button>
        <Button variant='contained' size='small' onClick={deleteItems}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default DeleteItem;
