import { Modal } from '@mui/material';
import { useState } from 'react';
import EditGoal from '@/components/profile/goal/editGoal/EditGoal.tsx';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import './NewGoal.scss';

const NewGoal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='newGoalItem' onClick={() => setOpen(prev => !prev)}>
      <div className='newGoalItem__content'>
        <EmojiEventsIcon />
        <p>Add Goal</p>
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
          <EditGoal handleClose={() => setOpen(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default NewGoal;
