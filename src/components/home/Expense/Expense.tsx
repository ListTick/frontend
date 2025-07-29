import React, { useState } from 'react';
import './Expense.scss'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Avatar,
  Button,
  Card, CardContent, CardHeader,
  CircularProgress, List, ListItemAvatar, ListItemText,
  Snackbar,
} from '@mui/material';
import {
  getAllExpensesByAccountId,
  getAllExpenseSharesByAccountId,
  reimburseExpenseShare
} from '@/api/expense.ts';
import ListItem from '@mui/material/ListItem';
import SellIcon from '@mui/icons-material/Sell';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AddCardIcon from '@mui/icons-material/AddCard';

const Expense: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const reimburseExpenseMutation = useMutation({
    mutationKey: ['reimburse-expense'],
    mutationFn: (id: string) => reimburseExpenseShare(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['expense-shares'] });
      void queryClient.invalidateQueries({ queryKey: ['expense'] });
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data?.message || 'An unexpected error occurred.');
    }
  });

  const {
    data: expenses,
    isError: isExpensesError,
    isLoading: isExpensesLoading
  } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => getAllExpensesByAccountId()
  });

  const {
    data: expenseSharesRaw,
    isError: isExpenseSharesError,
    isLoading: isExpenseSharesLoading
  } = useQuery({
    queryKey: ['expense-shares'],
    queryFn: () => getAllExpenseSharesByAccountId()
  });

  const expenseShares = {
    reimbursed: expenseSharesRaw?.filter((share) => share.reimbursed),
    notReimbursed: expenseSharesRaw?.filter((share) => !share.reimbursed)
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
  };

  return (
    <div className='expense'>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorMessage != null}
        autoHideDuration={2000}
        message={errorMessage}
      />
      <div className='expense__content'>
        <Card className='expense__content__card'>
          <CardHeader title='Recent Expenses' slotProps={{ title: { className: 'expense__content__card__title' } }}/>
          <CardContent sx={{ pt: 0 }}>
            <List disablePadding>
              {expenses
                .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
                .slice(0, 3)
                .map((expense) => (
                  <ListItem key={expense.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <SellIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${expense.amount} ${expense.currency}`}
                      secondary={<span className='expense__content__card__date'>{expense.creationDate.toString()}</span>}
                    />
                  </ListItem>
                ))}
            </List>
          </CardContent>
        </Card>
        <Card className='expense__content__card'>
          <CardHeader title='Your ownings' slotProps={{ title: { className: 'expense__content__card__title' } }}/>
          <CardContent sx={{ pt: 0 }}>
            <List disablePadding>
              {expenseShares.notReimbursed && expenseShares.notReimbursed.length > 0 ? (
                expenseShares.notReimbursed.slice(0, 3).map((share) => {
                  return (
                    <ListItem key={share.id}>
                      <ListItemAvatar>
                        <Avatar>
                          <AddCardIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${share.amount} ${share.currency}`}
                        secondary={<span className='expense__content__card__date'>{share.creationDate.toString()}</span>}
                      />
                      <Button
                        variant='contained'
                        color='primary'
                        style={{ marginLeft: '8px' }}
                        onClick={() => reimburseExpense(share.id)}
                      >
                        Reimburse
                      </Button>
                    </ListItem>
                  );
                })
              ) : (
                <ListItem>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    You are settled up
                    <CreditScoreIcon style={{ marginLeft: 15 }} />
                  </span>
                </ListItem>
              )}
            </List>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Expense;