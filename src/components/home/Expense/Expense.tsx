import React, { useState } from 'react';
import './Expense.scss'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Avatar,
  Button,
  Card, CardContent, CardHeader,
  CircularProgress, List, ListItemAvatar, ListItemText, Modal,
  Snackbar
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
import ExpenseInfo from '@/components/home/ExpenseInfo/ExpenseInfo.tsx';
import { ExpenseResponse, ExpenseShareResponse } from '@/types/expense.ts';

const Expense: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedObject, setSelectedObject] = useState<ExpenseResponse | ExpenseShareResponse>();

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

  const getRecentExpenses = () => {
    const ownExpenses = expenses?.filter((expense) => expense.reimbursed && !expense.shared)
    return [
      ...(ownExpenses ?? []),
      ...(expenseShares.reimbursed ?? [])
    ].sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
      .slice(0, 3)
  }

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

  const handleClose = () => setOpen(false);

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
              {getRecentExpenses()
                .map((expense) => (
                  <ListItem key={expense.id} onClick={() => { setSelectedObject(expense); setOpen(true); }}>
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
                    <ListItem key={share.id} onClick={() => { setSelectedObject(share); setOpen(true); }}>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-expense-info'
        aria-describedby='modal-expense-info-description'
        onClick={(e) => e.stopPropagation()}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <ExpenseInfo object={selectedObject as ExpenseResponse | ExpenseShareResponse} expenses={expenses} handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
};

export default Expense;