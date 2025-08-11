import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './NotificationInfo.scss'
import { useQuery } from '@tanstack/react-query';
import { getAllNotificationsByAccountId } from '@/api/notification.ts';
import { Button, CircularProgress, Snackbar } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import NotificationRecord from '@/components/home/Notification/NotificationRecord.tsx';
import { NotificationResponse } from '@/types/notification.ts';

interface NotificationInfoProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NotificationInfo: React.FC<NotificationInfoProps> = ({ setOpen }) => {
  const [filteredData, setFilteredData] = useState<NotificationResponse[]>([]);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getAllNotificationsByAccountId()
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const acknowledged =
        data.filter((value) => !value.acknowledged);
      setFilteredData(acknowledged);
    }
  }, [data]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={true}
        autoHideDuration={2000}
        message={'Oops there was an error, please contact our IT department'}
      />
    );
  }

  return (
    <div className='notificationInfo'>
      <h3>Notifications</h3>
      <div className='notificationInfo__content'>
        {filteredData.length > 0 ? (
          filteredData.map((value) => (
            <div className='notificationInfo__content__record' key={value.id}>
              <NotificationRecord notification={value} />
            </div>
          ))
        ) : (
          <div className='notificationInfo__content__no-record'>
            <p>All notifications have been acknowledged</p>
            <CheckIcon/>
          </div>
        )}
      </div>
      <Button variant='contained' size='small' onClick={() => setOpen(false)}>
        Close
      </Button>
    </div>
  );
};

export default NotificationInfo;