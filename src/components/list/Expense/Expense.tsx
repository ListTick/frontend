import React from 'react';
import './Expense.scss'
import { useQuery } from '@tanstack/react-query';
import { Button, CircularProgress } from '@mui/material';
import Snackbar from '@/components/task/alert/Alert.tsx';
import { getAllExpensesByAccountId, getAllExpenseSharesByAccountId } from '@/api/expense.ts';

const Expense: React.FC = () => {
  const {
    data: expenses,
    isError: isExpensesError,
    isLoading: isExpensesLoading,
  } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => getAllExpensesByAccountId(),
  });

  const {
    data: expenseSharesRaw,
    isError: isExpenseSharesError,
    isLoading: isExpenseSharesLoading,
  } = useQuery({
    queryKey: ['expense-shares'],
    queryFn: () => getAllExpenseSharesByAccountId(),
  });

  const expenseShares = {
    reimbursed: expenseSharesRaw?.filter((share) => share.reimbursed),
    notReimbursed: expenseSharesRaw?.filter((share) => !share.reimbursed),
  };

  if (isExpensesLoading || isExpenseSharesLoading) {
    return <CircularProgress />;
  }

  if (isExpensesError || isExpenseSharesError || !expenses || !expenseShares) {
    return <Snackbar severity='error'>Oops there was an error, please contact our IT department</Snackbar>;
  }

  return (
    <div>
      <h3>Spending's</h3>
      You owe:
      <ul>
        {expenseShares.notReimbursed && expenseShares.notReimbursed.length > 0 ? (
          expenseShares.notReimbursed.map((share) => {
            const expense = expenses?.find((e) => e.id === share.expenseId);
            return (
              <li key={share.id}>
                {share.amount} {share.currency} for expense: {expense?.amount} {expense?.currency}
                {expense && Array.isArray(expense.items) && expense.items.length > 0 && (
                  <>
                    {' ('}
                    {expense.items
                      .map(
                        (item) =>
                          `${item.name}${item.value !== undefined ? `, ${item.value}` : ''}`
                      )
                      .join(', ')}
                    {')'}
                  </>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: '8px' }}
                  onClick={() => alert('Ups the feature is not implemented yet')}
                >
                  Reimburse
                </Button>
              </li>
            );
          })
        ) : (
          <li>No not reimbursed expenses.</li>
        )}
      </ul>
      <hr />
      <h2>Last Expenses</h2>
      <ul>
        {expenses && expenses.length > 0 ? (
          expenses.map((expense) => {
            const shares = expenseSharesRaw?.filter(
              (share) => share.expenseId === expense.id
            );
            return (
              <li key={expense.id}>
                {expense.amount} {expense.currency}
                <ul>
                  {shares && shares.length > 0 ? (
                    shares.filter(share => share.reimbursed).map((share) => (
                      <li key={share.id}>
                        Share: {share.amount} {share.currency}
                      </li>
                    ))
                  ) : (
                    <li>No shares</li>
                  )}
                </ul>
              </li>
            );
          })
        ) : (
          <li>No expenses found.</li>
        )}
      </ul>
    </div>
  );
};

export default Expense;