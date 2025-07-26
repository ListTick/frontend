import React, { useState } from 'react';
import './NewItem.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ItemRequest } from '@/types/bucketListItem.ts';
import { createItem } from '@/api/bucketListItem.ts';
import { Button, Snackbar, TextField } from '@mui/material';
import { BucketListResponse } from '@/types/bucketList.ts';

interface NewItemProps {
  bucketList: BucketListResponse
}

const NewItem: React.FC<NewItemProps> = ({ bucketList }) => {
  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const handleCreate = () => {
    const itemRequest: ItemRequest = {
      name,
      bucketListId: bucketList.id
    };
    createMutation.mutate(itemRequest);
  };

  const createMutation = useMutation({
    mutationKey: ['bucket-list-item-create'],
    mutationFn: (itemRequest: ItemRequest) => createItem(itemRequest),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['bucket-list-items', bucketList.id] });
      setName('');
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data?.message || 'An unexpected error occurred.');
    }
  });

  return (
    <div className='createItem'>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorMessage !== null}
        autoHideDuration={2000}
        onClose={() => setErrorMessage(null)}
        message={errorMessage}
      />
      <div className='createItem__content'>
        <div className='createItem__content--inputs'>
          <TextField
            id='name'
            name='name'
            label='Name'
            variant='outlined'
            size='small'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ flex: 1, width: 400 }}
          />
        </div>
        <Button
          variant='contained'
          size='small'
          onClick={handleCreate}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default NewItem;