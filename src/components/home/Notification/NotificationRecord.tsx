import React, { useState } from 'react';
import { NotificationResponse } from '@/types/notification.ts';
import { Checkbox, Snackbar, FormControlLabel } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acknowledgeNotification } from '@/api/notification.ts';

interface NotificationRecordProps {
  notification: NotificationResponse
}

const NotificationRecord: React.FC<NotificationRecordProps> = ({ notification }) => {
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationKey: ['notification-acknowledge'],
    mutationFn: (id: string) => acknowledgeNotification(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error: any) => {
      setError(error?.response?.data?.message || 'An unexpected error occurred.');
    }
  });

  const handleClick = () => {
    postMutation.mutate(notification.id);
  };

  return (
    <div className='notificationRecord'>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={error !== null}
        autoHideDuration={2000}
        onClose={() => setError(null)}
        message={error}
      />
      <div className='notificationRecord__content'>
        <p>{notification.description}</p>
        <div className='notificationRecord__content__checkbox'>
          <FormControlLabel
            control={
              <Checkbox checked={notification.acknowledged} onChange={handleClick} size='small' />
            }
            label="Acknowledge"
          />

        </div>
      </div>
    </div>
  );
};

export default NotificationRecord;