import React, { useState } from 'react';
import {
  Button,
  Snackbar
} from '@mui/material';
import './DeleteItem.scss';
import { BucketListResponse } from '@/types/bucketList.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deactivateItem } from '@/api/bucketListItem.ts';

interface DeleteItemProps {
  selectedItems: string[];
  clearSelectedItems: () => void;
  bucketList: BucketListResponse;
  handleClose: () => void;
}

const DeleteItem: React.FC<DeleteItemProps> = ({ selectedItems, clearSelectedItems, bucketList, handleClose }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const deactivateItemMutation = useMutation({
    mutationKey: ['bucket-list-item-patch'],
    mutationFn: (id: string) =>
      deactivateItem(id),
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
      void queryClient.invalidateQueries({ queryKey: ['bucket-list-items', bucketList.id] });
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
