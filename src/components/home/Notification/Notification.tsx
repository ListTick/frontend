import './Notification.scss'

import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from '@mui/material';
import NotificationInfo from '@/components/home/Notification/NotificationInfo.tsx';
import './Notification.scss'

interface NotificationProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Notification: React.FC<NotificationProps> = ({ open, setOpen }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='modal-notification'
      >
        <div onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <NotificationInfo setOpen={setOpen}/>
        </div>
      </Modal>
    </div>
  );
};

export default Notification;