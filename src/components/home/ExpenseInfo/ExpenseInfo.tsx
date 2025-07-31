import React from 'react';
import { ExpenseResponse, ExpenseShareResponse } from '@/types/expense.ts';
import { TextField } from '@mui/material';

interface ExpenseInfoProps {
    object: ExpenseResponse | ExpenseShareResponse;
    expenses: ExpenseResponse[];
    handleClose: () => void;
}

const ExpenseInfo: React.FC<ExpenseInfoProps> = ({ object, expenses, handleClose })  => {

  const isShare = (object: ExpenseResponse | ExpenseShareResponse): object is ExpenseShareResponse => {
    return (object as ExpenseShareResponse).expenseId !== undefined;
  }

  const getExpense = (expenseId: string) => {
    return expenses.find(expense => expense.id === expenseId);
  }


  return (
    <div className='expenseInfo'>
      <div className='expenseInfo__content'>
        {isShare(object) ? (
          <div className='expenseInfo__content__share'>
            <h1>I am a share</h1>
            <TextField
              id='amount'
              name='amount'
              label='Amount'
              variant='outlined'
              type='text'
              value={object.amount}
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
        ) : (
          <div className='expenseInfo__content__expense'>
            <h1>I am an expense</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseInfo;