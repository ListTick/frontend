import { Alert } from '@mui/material';
import React from 'react';

interface SnackbarProps {
  severity: 'error' | 'warning' | 'info' | 'success';
  children: React.ReactNode;
}

const Snackbar = ({ severity, children }: SnackbarProps) => {
  return <Alert severity={severity}>{children}</Alert>;
};

export default Snackbar;
