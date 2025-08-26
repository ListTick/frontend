import React, { useEffect, useState } from 'react';
import { ExpenseResponse, ExpenseShareResponse } from '@/types/expense.ts';
import { Button, Snackbar, TextField } from '@mui/material';
import { ItemResponse } from '@/types/shoppingListItem';
import './ExpenseInfo.scss'
import { useMutation } from '@tanstack/react-query';
import { getExpenseBySharedId } from '@/api/expense.ts';
import { getShoppingListById } from '@/api/shoppingList.ts';
import { ShoppingListResponse } from '@/types/shoppingList.ts';

interface ExpenseInfoProps {
  object: ExpenseResponse | ExpenseShareResponse;
  expenses: ExpenseResponse[];
  handleClose: () => void;
}

const ExpenseInfo: React.FC<ExpenseInfoProps> = ({ object, expenses, handleClose }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fetchedExpenses, setFetchedExpenses] = useState<ExpenseResponse[]>([]);

  const getExpenseMutation = useMutation({
    mutationKey: ['get-expense'],
    mutationFn: (id: string) => getExpenseBySharedId(id),
    onSuccess: (data) => {
      setFetchedExpenses((prev) =>
        prev.some((expense) => expense.id === data.id)
          ? prev
          : [...prev, data]
      );
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data?.message || 'An unexpected error occurred.');
    }
  });

  const isShare = (object: ExpenseResponse | ExpenseShareResponse): object is ExpenseShareResponse => {
    return (object as ExpenseShareResponse).expenseId !== undefined;
  };

  const getExpense = (expenseId: string) => {
    return (
      expenses.find((expense) => expense.id === expenseId) ||
      fetchedExpenses.find((expense) => expense.id === expenseId)
    );
  };

  const items = (): ItemResponse[] => {
    if (isShare(object)) {
      return getExpense(object.expenseId)?.items ?? [];
    } else {
      return object.items ?? [];
    }
  };

  useEffect(() => {
    if (isShare(object)) {
      const localExpense = expenses.find((expense) => expense.id === object.expenseId);
      if (!localExpense) {
        getExpenseMutation.mutate(object.id);
      }
    }
  }, [object, expenses]);

  return (
    <div className='expenseInfo'>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorMessage != null}
        autoHideDuration={2000}
        message={errorMessage}
      />
      <div className='expenseInfo__content'>
        <h3>Expense Details</h3>
        <div className='expenseInfo__content__fields'>
          <TextField
            id='amount'
            name='amount'
            label='Amount'
            variant='outlined'
            type='text'
            value={isShare(object) ? `${object.amount} / ${getExpense(object.expenseId)?.amount} ( share of total )` : object.amount}
            disabled={true}
          />
          <TextField
            id='currency'
            name='currency'
            label='Currency'
            variant='outlined'
            type='text'
            value={object.currency}
            disabled={true}
          />
          <TextField
            id='shared'
            name='shared'
            label='Shared'
            variant='outlined'
            type='text'
            value={isShare(object)}
            disabled={true}
          />
          <TextField
            id='reimbursed'
            name='reimbursed'
            label='Reimbursed'
            variant='outlined'
            type='text'
            value={object.reimbursed}
            disabled={true}
          />
          <TextField
            id='created'
            name='created'
            label='Created'
            variant='outlined'
            type='text'
            value={object.creationDate}
            disabled={true}
          />
        </div>
        <div className='expenseInfo__content__items'>
          {items().map((item) => (
            <div key={item.id} className='expenseInfo__content__items__item'>
              <TextField
              id='itemName'
              name='itemName'
              label='Name'
              variant='outlined'
              type='text'
              value={item.name}
              disabled={true}
            />
              <TextField
                id='ItemAmount'
                name='ItemAmount'
                label='ItemAmount'
                variant='outlined'
                type='text'
                value={item.value !== null ? item.value : '-'}
                disabled={true}
              />
            </div>
          ))}
        </div>
        <div className='expenseInfo__content__buttons'>
          <Button variant='contained' size='small' onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseInfo;