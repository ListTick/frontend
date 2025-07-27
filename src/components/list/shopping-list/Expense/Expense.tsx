import React, { useState } from 'react';
import './Expense.scss'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, CircularProgress, Snackbar } from '@mui/material';
import {
  getAllExpensesByAccountId,
  getAllExpenseSharesByAccountId,
  reimburseExpenseShare
} from '@/api/expense.ts';

const Expense: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const reimburseExpenseMutation = useMutation({
    mutationKey: ['reimburse-expense'],
    mutationFn: ( id: string ) => reimburseExpenseShare(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['expense-shares'] });
      void queryClient.invalidateQueries({ queryKey: ['expense'] })
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data?.message || 'An unexpected error occurred.');
    }
  });

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
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={true}
        autoHideDuration={2000}
        message={'Oops there was an error, please contact our IT department'}
      />
    );
  }

  const reimburseExpense = (id: string) => {
    reimburseExpenseMutation.mutate(id);
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
                          `${item.name}${item.value !== undefined ? `: ${item.value}` : ''}`
                      )
                      .join(', ')}
                    {')'}
                  </>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: '8px' }}
                  onClick={() => reimburseExpense(share.id)}
                >
                  Reimburse
                </Button>
              </li>
            );
          })
        ) : (
          <li>You are settled up.</li>
        )}
      </ul>
      <hr />
      <h2>Last Expenses</h2>
      <ul>
        {expenses && expenses.length > 0 ? (
          expenses
            .slice()
            .sort((a, b) =>
              new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
            .slice(0, 3)
            .map((expense) => {
              const shares = expenseSharesRaw?.filter(
                (share) => share.expenseId === expense.id
              );
              return (
                <li key={expense.id}>
                  {expense.amount} {expense.currency}
                  {expense && Array.isArray(expense.items) && expense.items.length > 0 && (
                    <>
                      {' ('}
                      {expense.items
                        .map(
                          (item) =>
                            `${item.name}${item.value !== null ? `: ${item.value}` : ''}`
                        )
                        .join(', ')}
                      {')'}
                    </>
                  )}
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