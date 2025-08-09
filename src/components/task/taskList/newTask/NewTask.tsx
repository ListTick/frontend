import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import './NewTask.scss';
import { Modal } from '@mui/material';
import { useState } from 'react';
import EditTask from '../editTask/EditTask';

const NewTask = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='newTaskItem' onClick={() => setOpen(prev => !prev)}>
      <div className='newTaskItem__content'>
        <PlaylistAddIcon />
        <p>Add Task</p>
      </div>
      <Modal
        open={open}
        onClose={(_event, reason) => {
          if (reason === 'escapeKeyDown') {
            setOpen(false);
          }
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div onClick={e => e.stopPropagation()}>
          <EditTask handleClose={() => setOpen(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default NewTask;
