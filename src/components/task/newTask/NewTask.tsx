import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import './NewTask.scss';
import { Modal } from '@mui/material';
import { useState } from 'react';
import EditTask from '@/components/task/editTask/EditTask.tsx';

const NewTask = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='newTaskItem' onClick={handleOpen}>
      <div className='newTaskItem__content'>
        <PlaylistAddIcon />
        <p>Add Task</p>
      </div>
      <Modal
        open={open}
        onClose={(_event, reason) => {
          if (reason === 'escapeKeyDown') {
            handleClose();
          }
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div>
          <EditTask handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
};

export default NewTask;
